"use client";

import InputWithIcon from "@/app/(with-navigation)/snippets/components/InputWithIcon";
import CodeBlockClient from "@/components/code-components/CodeBlock/CodeBlockClient";
import CodePreview from "@/components/code-components/CodePreview";
import { Search } from "lucide-react";

const examples = [
  {
    title: "Default",
    code: `
<InputWithIcon
  icon={Search}
  inputProps={{ placeholder: "search..." }}
/>
    `,
    Preview: (
      <InputWithIcon icon={Search} inputProps={{ placeholder: "search..." }} />
    ),
  },
  {
    title: "Right icon",
    code: `
<InputWithIcon
  icon={Search}
  iconXPosition="right"
  inputProps={{ placeholder: "search..." }}
/>
    `,
    Preview: (
      <InputWithIcon
        icon={Search}
        iconXPosition="right"
        inputProps={{ placeholder: "search..." }}
      />
    ),
  },
  {
    title: "Left icon with RTL",
    code: `
  <InputWithIcon
          icon={Search}
          className="[direction:rtl]"
          iconXPosition="left"
          inputProps={{ placeholder: "جستجو..." }}
        />
              `,
    Preview: (
      <InputWithIcon
        icon={Search}
        className="[direction:rtl]"
        iconXPosition="left"
        inputProps={{ placeholder: "جستجو..." }}
      />
    ),
  },
  {
    title: "Right icon with RTL",
    code: `
<InputWithIcon
          icon={Search}
          className="[direction:rtl]"
          iconXPosition="right"
          inputProps={{ placeholder: "جستجو..." }}
        />
              `,
    Preview: (
      <InputWithIcon
        icon={Search}
        className="[direction:rtl]"
        iconXPosition="right"
        inputProps={{ placeholder: "جستجو..." }}
      />
    ),
  },
];

export default function Demo() {
  return (
    <section className="grid min-h-dvh w-full place-items-center">
      <div className="mx-auto w-full max-w-7xl">
        {examples.map(({ Preview, code, title }) => {
          return (
            <div key={title}>
              <h3>{title}</h3>
              <CodePreview
                codeChildren={<CodeBlockClient code={code} />}
                previewChildren={Preview}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
