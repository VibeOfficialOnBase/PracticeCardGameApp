import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

/**
 * WalletModal - portal-mounted root modal for wallet connectors.
 * Dev toggle via 'w' key is enabled only during development.
 */

export default function WalletModal(){
  const [open, setOpen] = useState(false);

  // Dev-only global toggle for convenience. TODO: remove or keep behind explicit dev flag before production.
  useEffect(()=>{
    if (process.env.NODE_ENV !== 'development') return;
    function onKey(e){
      if(e.key === 'w') setOpen(o=>!o);
    }
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  },[]);

  if (typeof document === "undefined") return null;

  return ReactDOM.createPortal(
    open ? (
      <div style={{
        position:'fixed', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
        background: 'rgba(2,6,23,0.6)', zIndex:9999
      }}>
        <div className="glass-card" style={{width:420, maxWidth:'92%'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3 style={{margin:0}}>Connect Wallet</h3>
            <button className="btn ghost" onClick={()=>setOpen(false)}>Close</button>
          </div>
          <div style={{marginTop:12, display:'grid', gap:8}}>
            <button className="btn primary">Connect Algorand (Pera)</button>
            <button className="btn primary">Connect Base (Coinbase)</button>
            <div className="text-muted" style={{fontSize:13}}>Dev: press 'w' to toggle this modal (development only)</div>
          </div>
        </div>
      </div>
    ) : null,
    document.body
  );
}