"use client";

import { useState, type ChangeEvent, type CSSProperties, type FormEvent } from "react";
import Link from "next/link";
import type { CountryData } from "@/data/countries";
import {
	CONTACT_COUNTRIES,
	EMAIL_PATTERN,
	ERRORS,
	MAX_LENGTH,
	SEND_ERROR_TEXT,
	TOPIC_TEXT,
	needsMessage,
	sentText,
} from "@/data/contact";
import { CONTACT_TOPICS, path, type ContactTopic } from "@/lib/routes";
import { SALES_EMAIL } from "@/lib/site";
import styles from "./ContactForm.module.css";

type FieldKey = "name" | "email" | "msg";

interface FormState {
	name: string;
	email: string;
	company: string;
	location: string;
	msg: string;
	/** Honeypot: real visitors never see or fill it. */
	website: string;
}

const FIELD_BORDER = "1px solid var(--field,#D7D3CD)";
const ERROR_BORDER = "2px solid #00325F";

const labelStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: 8, fontSize: 14, fontWeight: 600 };
const errorStyle: CSSProperties = { fontSize: 14, fontWeight: 400, color: "var(--link,#B8541F)" };

function inputStyle(invalid: boolean): CSSProperties {
	return {
		height: 48,
		padding: "0 14px",
		border: invalid ? ERROR_BORDER : FIELD_BORDER,
		borderRadius: 8,
		background: "var(--surface,#FFFFFF)",
		color: "var(--text,#14181F)",
		fontFamily: "Inter,sans-serif",
		fontSize: 16,
		fontWeight: 400,
	};
}

export default function ContactForm({ country, topic: initialTopic }: { country: CountryData; topic: ContactTopic }) {
	const [topic, setTopic] = useState<ContactTopic>(initialTopic);
	const [form, setForm] = useState<FormState>({
		name: "",
		email: "",
		company: "",
		location: country.name,
		msg: "",
		website: "",
	});
	const [errs, setErrs] = useState<Partial<Record<FieldKey, string>>>({});
	const [sent, setSent] = useState(false);
	const [sending, setSending] = useState(false);
	const [sendFailed, setSendFailed] = useState(false);

	const text = TOPIC_TEXT[topic];

	function set(key: keyof FormState, value: string) {
		setForm((f) => ({ ...f, [key]: value }));
		if (key === "name" || key === "email") setErrs((e) => ({ ...e, [key]: "" }));
		if (key === "msg") setErrs((e) => ({ ...e, msg: "" }));
	}

	async function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (sending) return;
		const er: Partial<Record<FieldKey, string>> = {};
		if (!form.name.trim()) er.name = ERRORS.name;
		if (!EMAIL_PATTERN.test(form.email.trim())) er.email = ERRORS.email;
		if (needsMessage(topic) && !form.msg.trim()) er.msg = ERRORS.msg;
		setErrs(er);
		setSendFailed(false);
		if (Object.keys(er).length) return;

		setSending(true);
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					country: country.code,
					topic,
					name: form.name.trim(),
					email: form.email.trim(),
					company: form.company.trim(),
					location: form.location,
					message: form.msg.trim(),
					website: form.website,
				}),
			});
			if (res.ok) setSent(true);
			else setSendFailed(true);
		} catch {
			setSendFailed(true);
		} finally {
			setSending(false);
		}
	}

	if (sent) {
		const done = sentText(topic, form.name, form.email, SALES_EMAIL);
		return (
			<div role="status" style={{ display: "flex", flexDirection: "column", gap: 12, padding: "12px 0" }}>
				<span
					style={{
						width: 44,
						height: 44,
						borderRadius: "50%",
						background: "var(--okbg,#EEF7F2)",
						color: "var(--okfg,#1D6B47)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
						<path d="M5 12l5 5L20 7" />
					</svg>
				</span>
				<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 24 }}>{done.title}</span>
				<span style={{ fontSize: 16, color: "var(--muted,#5A6472)" }}>{done.body}</span>
				<button
					type="button"
					onClick={() => {
						setSent(false);
						setForm((f) => ({ ...f, msg: "" }));
					}}
					style={{
						alignSelf: "flex-start",
						height: 44,
						padding: 0,
						border: 0,
						background: "transparent",
						color: "var(--link,#B8541F)",
						fontFamily: "Inter,sans-serif",
						fontSize: 15,
						fontWeight: 500,
						cursor: "pointer",
					}}
				>
					Send another message
				</button>
			</div>
		);
	}

	const fields: { key: "name" | "email" | "company"; label: string; type: string; ph: string; ac: string; max: number }[] = [
		{ key: "name", label: "Your name", type: "text", ph: "e.g. Priya Sharma", ac: "name", max: MAX_LENGTH.name },
		{ key: "email", label: "Work email", type: "email", ph: "you@shop.com", ac: "email", max: MAX_LENGTH.email },
		{ key: "company", label: "Shop or company (optional)", type: "text", ph: "e.g. " + country.region.store, ac: "organization", max: MAX_LENGTH.company },
	];

	return (
		<form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
			<fieldset style={{ border: 0, margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
				<legend style={{ fontSize: 14, fontWeight: 600, padding: "0 0 8px" }}>What can we help with?</legend>
				<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
					{CONTACT_TOPICS.map((k) => {
						const on = topic === k;
						return (
							<button
								key={k}
								type="button"
								aria-pressed={on}
								onClick={() => {
									setTopic(k);
									setErrs({});
								}}
								style={{
									minHeight: 44,
									padding: "0 14px",
									border: `1px solid ${on ? "var(--head,#0A2A4A)" : "var(--field,#D7D3CD)"}`,
									borderRadius: 8,
									background: on ? "var(--head,#0A2A4A)" : "transparent",
									color: on ? "var(--paper,#FDFAF7)" : "var(--text,#14181F)",
									fontFamily: "Inter,sans-serif",
									fontSize: 14,
									fontWeight: 500,
									cursor: "pointer",
								}}
							>
								{TOPIC_TEXT[k].label}
							</button>
						);
					})}
				</div>
			</fieldset>
			{fields.map((f) => {
				const err = f.key === "company" ? "" : errs[f.key] || "";
				return (
					<label key={f.key} style={labelStyle}>
						{f.label}
						<input
							type={f.type}
							value={form[f.key]}
							onChange={(e: ChangeEvent<HTMLInputElement>) => set(f.key, e.target.value)}
							placeholder={f.ph}
							autoComplete={f.ac}
							maxLength={f.max}
							aria-invalid={!!err}
							style={inputStyle(!!err)}
						/>
						{err ? (
							<span role="alert" style={errorStyle}>
								{err}
							</span>
						) : null}
					</label>
				);
			})}
			<label style={labelStyle}>
				Country
				<select
					value={form.location}
					onChange={(e) => set("location", e.target.value)}
					style={{ ...inputStyle(false), padding: "0 12px" }}
				>
					<option value="">Choose a country</option>
					{CONTACT_COUNTRIES.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
			</label>
			<label style={labelStyle}>
				{text.msgLabel}
				<textarea
					rows={4}
					value={form.msg}
					onChange={(e) => set("msg", e.target.value)}
					placeholder={text.msgPlaceholder}
					maxLength={MAX_LENGTH.message}
					aria-invalid={!!errs.msg}
					style={{
						padding: "12px 14px",
						border: errs.msg ? ERROR_BORDER : FIELD_BORDER,
						borderRadius: 8,
						background: "var(--surface,#FFFFFF)",
						color: "var(--text,#14181F)",
						fontFamily: "Inter,sans-serif",
						fontSize: 16,
						fontWeight: 400,
						lineHeight: 1.6,
						resize: "vertical",
					}}
				/>
				{errs.msg ? (
					<span role="alert" style={errorStyle}>
						{errs.msg}
					</span>
				) : null}
			</label>
			{/* Honeypot: hidden from people and screen readers, bots tend to fill it. */}
			<div aria-hidden="true" className={styles.trap}>
				<label>
					Website
					<input
						type="text"
						name="website"
						value={form.website}
						onChange={(e) => set("website", e.target.value)}
						tabIndex={-1}
						autoComplete="off"
					/>
				</label>
			</div>
			<span style={{ fontSize: 13, color: "var(--muted,#5A6472)" }}>
				We use these details only to reply to you. See our <Link href={path(country.code, "privacy")}>Privacy Policy</Link>.
			</span>
			{sendFailed ? (
				<span role="alert" style={errorStyle}>
					{SEND_ERROR_TEXT} {SALES_EMAIL}.
				</span>
			) : null}
			<button type="submit" disabled={sending} className={styles.submit}>
				{text.submit}
			</button>
		</form>
	);
}
