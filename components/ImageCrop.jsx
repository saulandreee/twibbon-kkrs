"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop, convertToPixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

import { Button } from "./ui/button";
import Image from "next/image";
import html2canvas from "html2canvas";
import moment from "moment";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageCrop() {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState({
    unit: "$",
    x: 0,
    y: 0,
    width: 250,
    height: 250,
  });
  const previewCanvasRef = useRef();
  const copyPreviewCanvasRef = useRef();
  const imgRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const blobUrlRef = useRef("");
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(1);
  const [croppedImage, setCroppedImage] = useState();

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(completedCrop.width * scaleX, completedCrop.height * scaleY);
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(previewCanvas, 0, 0, previewCanvas.width, previewCanvas.height, 0, 0, offscreen.width, offscreen.height);
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = URL.createObjectURL(blob);

    if (hiddenAnchorRef.current) {
      hiddenAnchorRef.current.href = blobUrlRef.current;
      hiddenAnchorRef.current.click();
    }
  }

  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  // function handleToggleAspectClick() {
  //   if (aspect) {
  //     setAspect(undefined);
  //   } else {
  //     setAspect(16 / 9);

  //     if (imgRef.current) {
  //       const { width, height } = imgRef.current;
  //       const newCrop = centerAspectCrop(width, height, 16 / 9);
  //       setCrop(newCrop);
  //       // Updates the preview
  //       setCompletedCrop(convertToPixelCrop(newCrop, width, height));
  //     }
  //   }
  // }

  const handleDownloadImage = async () => {
    const element = document.getElementById("twibbon-print"),
      canvas = await html2canvas(element, {
        allowTaint: true,
      }),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = `twibbon-kamyuu-${moment().format("HHmmss-DDMMYYYY")}.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
          <Label htmlFor="picture">1. Pilih foto</Label>
          <Input
            id="picture"
            type="file"
            onChange={(e) => onSelectFile(e)}
          />
        </div>
        <div className="grid gap-2 mb-4">
          <p className="font-medium">2. Crop sesuai bagian yang kamu mau</p>
          {imgSrc && (
            <ReactCrop
              crop={crop}
              className="w-fit"
              aspect={1}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}

          {/* <Button className="w-fit">Lanjutkan</Button> */}
        </div>
      </div>
      <div className="mb-6">
        <p className="mb-4 font-medium">3. Preview</p>
        <div
          className="w-full max-w-[1000px] aspect-square flex items-center justify-center relative"
          id="twibbon-print"
        >
          {!!completedCrop && (
            <div className="w-[75%]">
              <canvas
                ref={previewCanvasRef}
                className="w-full object-cover"
              />
            </div>
          )}
          <img
            src="/logo-circle-pink@4x.png"
            className="z-[1] absolute top-0 left-0 w-fit object-contain"
            // width={1000}
            // height={1000}
            // quality={100}
            alt="frame"
          />
        </div>
      </div>
      <div>
        <p className="mb-4 font-medium">4. Download</p>
        <Button onClick={handleDownloadImage}>Download</Button>
      </div>
    </>
  );
}
