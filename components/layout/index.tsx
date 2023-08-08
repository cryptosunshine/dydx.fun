import React, { useState, useEffect } from 'react';
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { sendTransaction } from '@wagmi/core'
import { parseEther } from 'viem'

type MainLayoutProps = {
    children: any
}

export default function MainLayout(prop: MainLayoutProps) {
    const { isConnected } = useAccount()

    const send = async () => {
        const { hash } = await sendTransaction({
            to: 'cryptoshine.eth',
            value: parseEther('0.01'),
          })
    }

    return (
        <div style={{ height: "100vh" }}>
            <div>
                <ConnectButton />
                <button onClick={() => send()} style={{width: '200px', height: '100px',marginTop: '50px'}}>Pay</button>
            </div>
            <div>
                {/* {prop.children} */}
            </div>
        </div>
    );
}