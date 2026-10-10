import { us } from "@/data/countries/us";
import LegalView from "./LegalView";

export default function TermsUs() {
	return <LegalView country={us} doc="terms" />;
}
