# Contract: Contact Form

**Date**: 2026-07-08 | **Plan**: [plan.md](../plan.md)

The contact form collects appointment inquiry data and opens WhatsApp with a prefilled message to the clinic. The patient must review and send the message in WhatsApp; opening the link does not deliver it.

## Form Identity

| Attribute | Value |
|-----------|-------|
| Delivery method | WhatsApp click-to-chat (`https://wa.me/<clinic-number>?text=...`) |
| Recipient | Clinic WhatsApp number from `practiceInfo.phone` |
| User action | Review the prefilled message and tap Send in WhatsApp |
| Server/API | Not required |

## Fields

| Field Name | Label | Type | Required | Validation |
|------------|-------|------|----------|------------|
| `name` | Full Name | text | Yes | Non-empty |
| `phone` | Phone Number | tel | Yes | Non-empty; numeric |
| `email` | Email Address | email | No | Valid email format if provided |
| `message` | Message / Treatment Interest | textarea | Yes | At least 10 characters |
| `preferred-date` | Preferred Appointment Date | date | No | Today or future date |

## States

| State | UI Behavior |
|-------|------------|
| Idle | Form visible with empty fields |
| Idle | Form visible with empty fields |
| Invalid | Inline validation errors; no WhatsApp link is opened |
| Handoff | Opens WhatsApp with the clinic number and form details; page explains that the patient must review and tap Send |

## Validation Rules

- `name`: required, at least 2 characters
- `phone`: required, at least 10 digits (spaces are ignored)
- `email`: optional, must match email pattern if provided
- `message`: required, at least 10 characters
- `preferred-date`: optional, must be today or a future date

## Message Contents

The prefilled message includes the clinic name, patient name, phone, message, and preferred date when provided. Email is included only when provided. Field values are URL-encoded before being added to the WhatsApp link.

## Delivery Limitation

The website cannot confirm that WhatsApp opened or that the patient sent the message. Do not display a success state claiming the clinic received the enquiry. The handoff view includes a direct WhatsApp link in case opening a new tab was blocked.

## Accessibility

- All fields must have visible `<label>` elements linked via `htmlFor` / `id`.
- Required fields must have `aria-required="true"`.
- Error messages must be associated with their field via `aria-describedby`.
- Form must be operable via keyboard alone.
