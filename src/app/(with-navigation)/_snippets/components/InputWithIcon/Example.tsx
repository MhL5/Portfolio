"use client";

import {
  InputWithIcon,
  InputWithIconIconSlot,
  InputWithIconInput,
} from "@/app/(with-navigation)/_snippets/components/InputWithIcon";
import { Button } from "@/components/ui/button";
import { Mail, Search, User2, X } from "lucide-react";
import { useState } from "react";

export default function Example() {
  const [search, setSearch] = useState("");
  const [searchRtl, setSearchRtl] = useState("");

  return (
    <div className="min-w-xs space-y-4">
      <search>
        <div>icon on both sides</div>

        <InputWithIcon className="h-8.5">
          <InputWithIconIconSlot iconXPosition="left">
            <Search />
          </InputWithIconIconSlot>

          <InputWithIconIconSlot iconXPosition="right">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearch("")}
              title="Clear search"
            >
              <span className="sr-only">Clear search</span>
              <X />
            </Button>
          </InputWithIconIconSlot>

          <InputWithIconInput
            iconsOn="both"
            className="text-base placeholder:text-sm"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputWithIcon>
      </search>
      <search>
        <div>icon on both sides rtl</div>

        <InputWithIcon dir="rtl" className="h-8.5">
          <InputWithIconIconSlot iconXPosition="left">
            <Search />
          </InputWithIconIconSlot>

          <InputWithIconIconSlot iconXPosition="right">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchRtl("")}
              title="Clear search"
            >
              <span className="sr-only">Clear search</span>
              <X />
            </Button>
          </InputWithIconIconSlot>

          <InputWithIconInput
            iconsOn="both"
            className="text-base placeholder:text-sm"
            placeholder="جستجو..."
            value={searchRtl}
            onChange={(e) => setSearchRtl(e.target.value)}
          />
        </InputWithIcon>
      </search>

      <div>
        <div>icon on the right</div>
        <InputWithIcon>
          <InputWithIconIconSlot iconXPosition="right">
            <Mail />
          </InputWithIconIconSlot>
          <InputWithIconInput
            iconsOn="right"
            className="text-base placeholder:text-sm"
            placeholder="Email..."
            autoComplete="email"
          />
        </InputWithIcon>
      </div>

      <div>
        <div>icon on the left</div>
        <InputWithIcon>
          <InputWithIconIconSlot iconXPosition="left">
            <User2 />
          </InputWithIconIconSlot>
          <InputWithIconInput
            iconsOn="left"
            className="text-base placeholder:text-sm"
            placeholder="Username..."
            autoComplete="username"
          />
        </InputWithIcon>
      </div>
    </div>
  );
}
