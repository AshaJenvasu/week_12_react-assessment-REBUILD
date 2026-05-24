import { useEffect } from "react";

import escanorVoiceUrl from "../assets/escanor.mp3";

export const Owner = () => {
  useEffect(() => {
    // 1. สร้างวัตถุชี้เป้าไปที่ไฟล์เสียงในโฟลเดอร์ public เดิมของหนู
    const escanorVoice = new Audio(escanorVoiceUrl);

    // 2. ปรับระดับความดังตามใจสั่ง (0.0 - 1.0)
    escanorVoice.volume = 0.5;

    // 3. สั่งคำรามทันทีที่ Component ถูกวาดเสร็จ (Mounting)
    escanorVoice.play().catch((err) => {
      console.log("Audio play blocked:", err);
    });
    return () => {
      escanorVoice.pause();
    };
  }, []);
  return (
    <div className="flex flex-col items-center pt-24 px-10 min-h-screen bg-gradient-to-b from-amber-100 to-[#EAEAEA]">
      {/* 1. Header  */}
      <h1 className="text-6xl font-black text-center mb-16 leading-tight tracking-tighter text-brown-950 uppercase border-b-8 border-orange-600 pb-4 shadow-xl">
        04_Chaiyawat (Asha) Jenvasu - The Owner
      </h1>

      {/* 2. Content Card  */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-amber-300 shadow-2xl p-12 flex flex-col items-center border-4 border-amber-500">
        {/* 3. รูปภาพ */}
        <div className="w-64 h-64 rounded-full overflow-hidden mb-12 border-8 border-amber-400 shadow-xl shadow-orange-500/50 transform hover:scale-110 transition-transform duration-300">
          <img
            src="https://i.ytimg.com/vi/zlwQERpksnw/maxresdefault.jpg" //
            alt="Owner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 4. Description  */}
        <div className="text-center space-y-6 max-w-2xl">
          <h2 className="text-4xl font-extrabold text-orange-700 italic tracking-wide">
            「私は七つの大罪 エスカノール」
          </h2>
          <p className="text-3xl font-black text-brown-950">
            Escanor, The Lion's Sin of Pride
          </p>
          <div className="border-t-4 border-red-700 w-32 mx-auto mt-6 mb-8"></div>
          <p className="text-xl text-brown-900 leading-relaxed font-semibold bg-amber-50 p-6 rounded-xl border border-yellow-300 shadow-inner">
            As the owner of this legendary application, I welcome you with the
            unmatched power of the Sunshine. Those who decisions are correct may
            proceed... the rest, I will decide.
            <br />
            {`"My decisions are the only ones that matter!"`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Owner;
