import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { karla } from "$/src/config/fonts";

export default function Page() {
  const css = `
        .clerk-footer {
            background: hsl(var(--nextui-primary-700));
        }
        `;
  return (
    <main>
      <div className="flex flex-col items-center justify-between p-24 ">
        <style>{css}</style>
        <SignUp
          appearance={{
            baseTheme: dark,
            elements: {
              card: "bg-primary-700",
              headerSubtitle: `font-sans ${karla.variable}`,
              formFieldLabel: `font-sans ${karla.variable}`,
              formFieldInput: "bg-white focus:outline-none focus:ring-2",
              formButtonPrimary: "font-bold",
              footer: "clerk-footer",
              footerActionText: `font-sans ${karla.variable}`,
              footerActionLink: `text-green-300 font-sans ${karla.variable} hover:text-green-300`,
            },
          }}
        />
      </div>
    </main>
  );
}
