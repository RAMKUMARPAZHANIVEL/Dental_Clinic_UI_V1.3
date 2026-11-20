"use client";

import { useState } from "react";
import { practiceInfo } from "../app/utils/config";

function buildWhatsAppMessage(fields) {
  return [
    `Hello ${practiceInfo.name},`,
    "",
    "I would like to send an appointment enquiry.",
    "",
    `Name: ${fields.name.trim()}`,
    `Phone: ${fields.phone.trim()}`,
    fields.email.trim() && `Email: ${fields.email.trim()}`,
    `Message: ${fields.message.trim()}`,
    fields["preferred-date"] && `Preferred date: ${fields["preferred-date"]}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    "preferred-date": "",
  });

  function validate() {
    const e = {};
    if (!fields.name.trim() || fields.name.trim().length < 2) e.name = "Please enter your full name.";
    if (fields.phone.replace(/\D/g, "").length < 10)
      e.phone = "Please enter a valid phone number (at least 10 digits).";
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = "Please enter a valid email address.";
    if (!fields.message.trim() || fields.message.trim().length < 10)
      e.message = "Please describe your query or treatment interest (at least 10 characters).";
    if (fields["preferred-date"]) {
      const chosen = new Date(fields["preferred-date"]);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosen < today) e["preferred-date"] = "Please select today or a future date.";
    }
    return e;
  }

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  }

  const whatsappUrl = `https://wa.me/${practiceInfo.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    buildWhatsAppMessage(fields)
  )}`;

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setStatus("handoff");
  }

  if (status === "handoff") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center" role="status">
        <h3 className="text-xl font-semibold text-green-800 mb-2">Continue in WhatsApp</h3>
        <p className="text-green-700">
          Review your message in WhatsApp and tap Send to deliver it to the clinic.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-green-600 text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-green-700 transition"
        >
          Open WhatsApp
        </a>
      </div>
    );
  }

  const inputClass = (field) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200"
    }`;

  return (
    <form
      name="contact"
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-required="true"
          aria-describedby={errors.name ? "name-error" : undefined}
          value={fields.name}
          onChange={handleChange}
          className={inputClass("name")}
          placeholder="Your full name"
        />
        {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          aria-required="true"
          aria-describedby={errors.phone ? "phone-error" : undefined}
          value={fields.phone}
          onChange={handleChange}
          className={inputClass("phone")}
          placeholder="+91 XXXXX XXXXX"
        />
        {errors.phone && <p id="phone-error" className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email Address <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          aria-describedby={errors.email ? "email-error" : undefined}
          value={fields.email}
          onChange={handleChange}
          className={inputClass("email")}
          placeholder="your@email.com"
        />
        {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message / Treatment Interest <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          aria-required="true"
          aria-describedby={errors.message ? "message-error" : undefined}
          value={fields.message}
          onChange={handleChange}
          className={inputClass("message")}
          placeholder="Tell us about your dental concern or the treatment you're interested in..."
        />
        {errors.message && <p id="message-error" className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      <div>
        <label htmlFor="preferred-date" className="block text-sm font-medium mb-1">
          Preferred Appointment Date <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="preferred-date"
          name="preferred-date"
          type="date"
          aria-describedby={errors["preferred-date"] ? "date-error" : undefined}
          value={fields["preferred-date"]}
          onChange={handleChange}
          className={inputClass("preferred-date")}
        />
        {errors["preferred-date"] && (
          <p id="date-error" className="text-red-500 text-xs mt-1">{errors["preferred-date"]}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-primary text-white px-8 py-3 rounded-xl shadow hover:scale-105 transition font-medium"
      >
        Submit
      </button>
    </form>
  );
}
