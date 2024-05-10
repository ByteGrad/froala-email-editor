"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import { useState } from "react";
import { FroalaOptions } from "froala-editor";

const FroalaEditorComponent = dynamic(
  async () => {
    const results = await Promise.all([
      import("react-froala-wysiwyg"),
      import("froala-editor/js/plugins.pkgd.min.js"),
    ]);
    return results[0];
  },
  {
    ssr: false,
  }
);

const froalaConfig: Partial<FroalaOptions> = {
  events: {
    "image.inserted": function ($img) {
      const src = $img.attr("src");
    },
  },
  heightMin: 150,
  placeholderText: "Compose an email...",
  charCounterCount: false,
  wordCounterCount: false,
  quickInsertEnabled: false,
  toolbarButtons: [
    ["fullscreen", "undo", "redo", "getPDF", "print"],
    [
      "bold",
      "italic",
      "underline",
      "textColor",
      "backgroundColor",
      "clearFormatting",
    ],
    ["alignLeft", "alignCenter", "alignRight", "alignJustify"],
    ["formatOL", "formatUL", "indent", "outdent"],
    ["paragraphFormat"],
    ["fontFamily"],
    ["fontSize"],
    ["insertLink", "insertImage", "quote"],
  ],
  imageOutputSize: true,
  fontSize: ["14", "16", "18", "24", "36"],
  linkList: [
    {
      text: "Unsubscribe from this list",
      href: "{{UnsubscribeURL}}",
    },
    {
      text: "View this email in your browser",
      href: "{{WebVersionURL}}",
    },
    {
      text: "Powered by Froala",
      href: "{{RewardsURL}}",
    },
  ],
};

export default function Home() {
  const [emailHtml, setEmailHtml] = useState("");

  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-[850px] bg-white px-10 py-8 rounded border border-black/20">
        <div className="mb-5 space-y-1">
          <Input placeholder="To" />
          <Input placeholder="Subject" />
        </div>

        <FroalaEditorComponent
          tag="textarea"
          model={emailHtml}
          onModelChange={setEmailHtml}
          config={froalaConfig}
        />

        <Button className="mt-5">Send email</Button>
      </div>
    </main>
  );
}
