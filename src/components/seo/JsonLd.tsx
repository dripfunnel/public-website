/** Structured data for search engines. Must always match what the visitor sees on the page. */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
	return (
		<script
			type="application/ld+json"
			// "<" is escaped so no string in the data can close the script tag.
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
		/>
	);
}
