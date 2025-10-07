import type { Thing, WithContext } from "schema-dts";

type StructuredDataScriptProps<T extends Thing> = {
  data: WithContext<T>;
  id?: string;
};

export default function StructuredDataScript<T extends Thing>({
  data,
  id,
}: StructuredDataScriptProps<T>) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: this is safe because the data comes from our code and not from the users
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
