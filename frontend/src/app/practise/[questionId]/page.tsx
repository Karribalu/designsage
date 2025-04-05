"use client";
import React, {FC, useEffect, useRef, useState} from "react";
import {useParams} from "next/navigation";
import {SideBar} from "@/app-components/sidebar/sidebar";
import {SidebarProvider} from "@/components/ui/sidebar";
import CanvasComponent from "@/app-components/canvas/canvas";
import {CommunicationToolbar} from "@/app-components/communication-toolbar/communication-toolbar";
import questions from "@/lib/mocks/mock-questions.json";
import {Edge, Node, useNodesState} from "@xyflow/react";
import {ResizableEdgeData, ResizableNodeData} from "@/app-components/types";
import {NODE_SIZES} from "@/constants";
import mermaidUtility from "@/app-components/utils/mermaid-utility";
import dynamic from "next/dynamic";
const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw,
    {
        ssr: false,
    },
);


interface IProps {
}

const initialNodes: Node<ResizableNodeData>[] = [
    // {
    //     id: "node_100",
    //     position: {x: 0, y: 300},
    //     data: {
    //         label: "cylinder",
    //         color: "#EBC347",
    //         type: "cylinder",
    //         ...NODE_SIZES["cylinder"],
    //     },
    //     type: "cylinder",
    // },
    // {
    //     id: "node_101",
    //     position: {x: 300, y: 300},
    //     data: {
    //         label: "cylinder",
    //         color: "#EBC347",
    //         type: "cylinder",
    //         ...NODE_SIZES["cylinder"],
    //     },
    //     type: "cylinder",
    // },
];
const initialEdges: Edge<ResizableEdgeData>[] = [
    // {
    //     id: "edge_100",
    //     source: "node_100",
    //     target: "node_101",
    //     selected: true,
    //     data: {
    //         label: "label",
    //         isEditing: false,
    //         type: "forward",
    //         color: "black",
    //         style: "solid",
    //         setSelected: (isSelected: boolean) => {
    //             console.log("isSelected", isSelected);
    //         },
    //     },
    // },
];

/**
 * @author
 * @function @Practise
 **/

export const Practise: FC<IProps> = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isCallStarted, setIsCallStarted] = useState(false);
    const [ephimeralToken, setEphimeralToken] = useState<string | null>(null);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);
    const [nodes, setNodes] =
        useNodesState<Node<ResizableNodeData>>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const audioRef = useRef<HTMLAudioElement>(null);
    const {questionId} = useParams();
    const question = questions.find(
        (question) => question.id === parseInt(questionId as string)
    );
    const [previousMermaid, setPreviousMermaid] = useState<string | null>(null);
    const [currentCountWithoutChange, setCurrentCountWithoutChange] = useState<number>(0);
    const [callTime, setCallTime] = useState<number>(0);
    const [introMessageSent, setIntroMessageSent] = useState(false);
    useEffect(() => {
        if (ephimeralToken) {
            startCall();
        }
    }, [ephimeralToken]);
    const startCall = async () => {
        console.log("Ephimeral token", ephimeralToken);
        const pc = new RTCPeerConnection();
        if (audioRef && audioRef.current !== null) {
            // @ts-ignore
            pc.ontrack = (e) => (audioRef.current.srcObject = e.streams[0]);
        }
        const ms = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        pc.addTrack(ms.getTracks()[0]);
        // Set up data channel for sending and receiving events
        const dc = pc.createDataChannel("oai-events");
        dc.onmessage = (e) => {
            console.log("I am output ", e);
        };
        const mermaidInterval = setInterval(() => {
            setCallTime(prev => prev + 1);
            console.log("dc.readyState", dc.readyState);
            if (dc.readyState === "open") {
                const mermaid = mermaidUtility.convertToMermaid(nodes, edges);
                if(mermaid === null) {
                    if(!introMessageSent) {
                        setIntroMessageSent(true);
                        dc.send(
                            JSON.stringify({
                                "type": "conversation.item.create",
                                "item": {
                                    "type": "message",
                                    "role": "system",
                                    "content": [
                                        {
                                            "type": "input_text",
                                            "text": `Please provide the context of the design problem and ask the user to ask claryfying questions or start creating the design \n`
                                        }
                                    ]
                                }
                            })
                        );
                    }
                    return;
                }
                if (mermaid === previousMermaid) {
                    console.log("Mermaid is not changed ", mermaid);
                    setCurrentCountWithoutChange(prev => prev + 1);

                    if (currentCountWithoutChange > 30) {
                        // We can assume that the user is not making any changes to the diagram since 30 seconds
                        // So we can send a message to the AI to check the diagram
                        console.log("User is not making any changes to the diagram since 30 seconds");
                        dc.send(
                            JSON.stringify({
                                "type": "conversation.item.create",
                                "item": {
                                    "type": "message",
                                    "role": "user",
                                    "content": [
                                        {
                                            "type": "input_text",
                                            "text": `User is not making any changes to the diagram since 30 seconds.
                                            Please check if the diagram is going on in the right direction.
                                            Or ask if the user is stuck or need an assistance in resolving the doubts.
                                            The current diagram is as follows: ${mermaid} \n
                                            \n`
                                        }
                                    ]
                                }
                            })
                        );
                    }
                } else {
                    setCurrentCountWithoutChange(0);
                    setPreviousMermaid(mermaid);
                    console.log("new Mermaid ", mermaid);
                    dc.send(
                        JSON.stringify({
                            "type": "conversation.item.create",
                            "item": {
                                "type": "message",
                                "role": "user",
                                "content": [
                                    {
                                        "type": "input_text",
                                        "text": `User's current design diagram in a mermaid format is as follows: ${mermaid} \n
                                    Please check if the diagram is going on in the right direction. If not, please provide a suggestion to improve it or ask follow up questions on the decision taken \n`
                                    }
                                ]
                            }
                        })
                    );
                }
            }
        }, 1000);
        // Start the session using the Session Description Protocol (SDP)
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const baseUrl = "https://api.openai.com/v1/realtime";
        const model = "gpt-4o-realtime-preview";
        const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
            method: "POST",
            body: offer.sdp,
            headers: {
                Authorization: `Bearer ${ephimeralToken}`,
                "Content-Type": "application/sdp",
            },
        });

        const answer = {
            type: "answer",
            sdp: await sdpResponse.text(),
        };
        // @ts-ignore
        await pc.setRemoteDescription(answer);
        return () => {
            clearInterval(mermaidInterval);
            pc.close();
            audioRef.current?.pause();
            audioRef.current = null;
        }
    };
    const handleOnCallStart = async () => {
        console.log("Call started");
        setIsCallStarted(true);
        // setAudioSrc("/path/to/audio/file.mp3"); // Replace with actual audio source
        // Get the ephimeral token and establish the call conenction with open AI
        fetch("/api/webrtc/ephimeral-token?system_design=" + question?.title)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setEphimeralToken(data.client_secret.value);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleOnCallEnd = () => {
        console.log("Call ended");
        setIsCallStarted(false);
        setAudioSrc(null);
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    return (
        <div className="flex">
            <SidebarProvider className="absolute left-0" open={isOpen}>
                <SideBar
                    questionId={questionId as string}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    handleCallStart={handleOnCallStart}
                    isCallStarted={isCallStarted}
                />
                <div className="flex flex-col w-full">
                    {/*<CanvasComponent nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges}/>*/}
                    <div className="h-[95%] w-full mt-15">
                    <Excalidraw />
                    </div>
                    {isCallStarted && (
                        <CommunicationToolbar
                            questionName={question?.title}
                            handleCallEnd={handleOnCallEnd}
                            audioSrc={audioSrc}
                            audioRef={audioRef}
                        />
                    )}
                </div>
            </SidebarProvider>
        </div>
    );
};

export default Practise;
