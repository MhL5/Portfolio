import {
  MatchMedia,
  MatchMediaBreakpoint,
} from "@/registry/new-york/MatchMedia/MatchMedia";

export default function Example() {
  return (
    <div>
      <MatchMedia query="(max-width: 768px)" fallback={`loading...`}>
        <div>
          <p>Mobile</p>
        </div>
      </MatchMedia>

      <MatchMediaBreakpoint breakpoint="sm">
        <div>
          <p>Desktop</p>
        </div>
      </MatchMediaBreakpoint>
    </div>
  );
}
