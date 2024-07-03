import ContentPage from "@/components/ui/ContentPage";
import LandingPageHeader from "@/components/ui/LandingPageHeader";
import LogInComponent from "@/components/ui/LogInComponent";

export default function Home() {
  return (
    <ContentPage  cssStyle={"flex-col"}>
      <LandingPageHeader />
      <section className="flex flex-col items-center justify-center w-full bg-base-100 h-full">
        <LogInComponent />
      </section>
    </ContentPage>
  );
}
