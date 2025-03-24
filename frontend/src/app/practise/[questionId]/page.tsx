"use client";
import React, { FC, useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { SideBar } from "@/app-components/sidebar/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import CanvasComponent from "@/app-components/canvas/canvas";
import { CommunicationToolbar } from "@/app-components/communication-toolbar/communication-toolbar";
import questions from "@/lib/mocks/mock-questions.json";

interface IProps {}

/**
 * @author
 * @function @Practise
 **/

export const Practise: FC<IProps> = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [ephimeralToken, setEphimeralToken] = useState<string | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { questionId } = useParams();
  const question = questions.find(
    (question) => question.id === parseInt(questionId as string)
  );
  useEffect(() => {
    if (ephimeralToken) {
      startCall();
    }
  }, [ephimeralToken]);
  const startCall = async () => {
    console.log("Ephimeral token", ephimeralToken);
    const pc = new RTCPeerConnection();
    if (audioRef && audioRef.current !== null) {
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
    await pc.setRemoteDescription(answer);
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
          <CanvasComponent />
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
