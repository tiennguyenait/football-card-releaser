"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button, Input, Select } from "antd";
import { toPng } from "html-to-image";
import bgrImg from "../../public/image/bgr.png";
import messiImg from "../../public/image/messi.jpg";
import vietNamFlag from "../../public/image/Flag_of_Vietnam.svg.png";
import "./style.css";
import axios from "axios";

// Component InputField giúp tái sử dụng code
const InputField = ({
  label,
  value,
  onChange,
  type = "number",
  min = 1,
  max = 1000,
}) => (
  <div className="flex items-center justify-between w-[300px]">
    <p className="w-[100px]">{label}:</p>
    <Input type={type} value={value} onChange={onChange} min={min} max={max} />
  </div>
);

export default function Home() {
  const ref = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [fullName, setFullName] = useState({ FN: "NGUYEN", LN: "VAN A" });
  const [countries, setCountries] = useState([]);
  const [flag, setFlag] = useState(vietNamFlag);

  const [player, setPlayer] = useState({
    number: 97,
    position: "LB",
    SPE: 50,
    STR: 50,
    STA: 50,
    CON: 50,
    TAC: 50,
    SHO: 50,
    HEIGHT: 170,
    FOOT: "BOTH",
  });

  // Hàm cập nhật state một cách gọn gàng
  const handleChange = (field) => (e) => {
    if (
      (field === "position" && e.target.value.length > 3) ||
      (field === "FOOT" && e.target.value.length > 5)
    ) {
      console.log("cc");
    } else if (Number(e.target.value) >= 1000) {
      return;
    } else {
      setPlayer((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleChangeFullName = (e, name) => {
    if (e.target.value.length >= 18) {
      return;
    }
    setFullName((prev) => ({ ...prev, [name]: e.target.value }));
  };

  // Hàm xử lý chọn ảnh
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  // Hàm xuất ảnh PNG
  const exportImage = useCallback(() => {
    if (!ref.current) return;
    toPng(ref.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "player-card.png";
      link.href = dataUrl;
      link.click();
    });
  }, []);

  const onChange = (flag) => {
    setFlag(flag);
  };

  useEffect(() => {
    if (!countries.length)
      axios
        .get(
          "https://restcountries.com/v2/all?fields=name,capital,flags,population,region"
        )
        .then(({ data }) => setCountries(data));
  }, []);

  return (
    <div id="full-container" className="flex justify-center">
      <div

        id="fb-container"
        className="flex flex-col justify-center relative"
      >
        <div         ref={ref} className="flex justify-center relative">
          <Image width={700} src={bgrImg} alt="Background" />
          <div className="absolute text-center left-[150px] top-[91px] text-white font-bold w-[70px]">
            <span className="text-center  text-[50px]">{player.number}</span>
            <div className="bg-red-600 text-center py-1 px-2">
              {player.position}
            </div>
            <div className="mt-3">
              {["SPE", "STR", "STA", "CON", "TAC", "SHO"].map((stat) => (
                <div key={stat} className="flex justify-between">
                  <span>{stat}:</span>
                  <span>{player[stat]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute left-1/2 top-[400px] -translate-x-1/2 text-center font-bold">
            <h1 className="fn text-[20px] text-slate-600">{fullName.FN}</h1>
            <h1 className="ln text-[35px]">{fullName.LN}</h1>
          </div>

          <div className="absolute right-[141px] top-[121px] w-[300px] h-[270px] p-2 overflow-hidden">
            <Image
              src={selectedImage || messiImg}
              alt="Player"
              width={300}
              height={300}
            />
          </div>

          <div className="flex items-center gap-5 absolute left-[136px] top-[500px] text-white text-[30px] font-bold">
            <div className="flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M11.3 19.5v-15h2.4v15H17L12.5 24L8 19.5zM12.5 0L17 4.5H8z"
                />
              </svg>
              <div>{player.HEIGHT}</div>
              <div>CM</div>
            </div>
            <Image width={70} height={70} src={flag} alt="Vietnam Flag" />
            <div className="flex items-center gap-2">
              <svg width="40" height="40" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                >
                  <path d="M19.101 18H7.963c-2.934 0-4.4 0-5.295-1.117c-1.697-2.12.237-7.76 1.408-9.883c.397 2.4 4.486 2.333 5.975 2c-.992-1.999.332-2.666.994-3h.002c2.953 3.5 9.268 5.404 10.815 9.219c.669 1.648-1.236 2.781-2.76 2.781" />
                  <path d="M2 14c4.165 1.43 6.731 1.844 10.022.804c.997-.315 1.495-.473 1.806-.452c.31.022.945.317 2.213.909c1.583.738 3.756 1.163 5.959.097M13.5 9.5L15 8m.5 3L17 9.5" />
                </g>
              </svg>
              <p>{player.FOOT}</p>
            </div>
          </div>
        </div>
        <h1 className="text-gray-500">CREATE YOUR OWN CARD AT 1KVIEW.COM/CARD</h1>
      </div>

      <div>
        <div className="mb-2">
          <input type="file" onChange={handleImageChange} className="mt-3" />
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col gap-2">
            {["SPE", "STR", "STA", "CON", "TAC", "SHO"].map((stat) => (
              <InputField
                key={stat}
                label={stat}
                value={player[stat]}
                onChange={handleChange(stat)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <Select
              onChange={onChange}
              showSearch
              style={{ width: 300 }}
              placeholder="Select a country"
            >
              {countries.map((c, index) => (
                <Select.Option
                  key={index}
                  value={c.flags.png}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="flex">
                    <Image
                      className="object-contain"
                      src={c.flags.png}
                      height={30}
                      width={30}
                      style={{ marginRight: 8 }}
                      alt=""
                    />
                    <h3>{c.name}</h3>
                  </div>
                </Select.Option>
              ))}
            </Select>
            <InputField
              label="First"
              value={fullName.FN}
              onChange={(e) => handleChangeFullName(e, "FN")}
              type="text"
            />
            <InputField
              label="Last"
              value={fullName.LN}
              onChange={(e) => handleChangeFullName(e, "LN")}
              type="text"
            />
            <InputField
              label="Number"
              value={player.number}
              onChange={handleChange("number")}
            />
            <InputField
              label="Position"
              value={player.position}
              onChange={handleChange("position")}
              type="text"
            />
            <InputField
              label="Height"
              value={player.HEIGHT}
              onChange={handleChange("HEIGHT")}
            />
            <InputField
              label="Foot"
              value={player.FOOT}
              onChange={handleChange("FOOT")}
              type="text"
            />
          </div>
        </div>
        <Button className="mt-3" type="primary" onClick={exportImage}>
          Export Image
        </Button>
      </div>
    </div>
  );
}
