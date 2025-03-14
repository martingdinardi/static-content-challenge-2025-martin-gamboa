import { Container } from "@/components/ui/Container";
import MarkdownsNavbar from "./markdowns/components/MarkdownsNavbar";
import { RecommendedArticles } from "./markdowns/components/RecommendedArticles";
import Footer from "./markdowns/components/Footer";

function NotFoundPage() {
  return (
    <Container className="flex flex-col justify-between min-h-screen pb-4">
      <div>
        <MarkdownsNavbar />
        <div className="py-4 w-full lg:w-1/2">
          <h1>Oops! </h1>
          <h2 className="!text-white">
            {`We can't seem to find the page or markdown you're looking for!`}
          </h2>
          <p>Here a some helpful links instead!</p>
          <div className="py-8">
            <RecommendedArticles limit={3} />
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
}

export default NotFoundPage;
