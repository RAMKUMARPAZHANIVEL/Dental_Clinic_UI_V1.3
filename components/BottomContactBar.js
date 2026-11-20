import { FiPhone, FiCalendar } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { practiceInfo, whatsappUrl } from "../app/utils/config";

export default function BottomContactBar() {
  const telHref = `tel:${practiceInfo.phone.replace(/\s/g, "")}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-3 divide-x divide-gray-200">
        <a
          href={telHref}
          className="flex flex-col items-center justify-center py-3 gap-1 active:bg-gray-50"
          aria-label={`Call ${practiceInfo.name}`}
        >
          <FiPhone className="w-5 h-5 text-primary" />
          <span className="text-xs font-medium text-gray-600">Call</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-3 gap-1 active:bg-gray-50"
          aria-label={`WhatsApp ${practiceInfo.name}`}
        >
          <FaWhatsapp className="w-5 h-5 text-green-500" />
          <span className="text-xs font-medium text-gray-600">WhatsApp</span>
        </a>

        <Link
          href="/contact"
          className="flex flex-col items-center justify-center py-3 gap-1 bg-primary active:bg-pink-600"
          aria-label="Book an appointment"
        >
          <FiCalendar className="w-5 h-5 text-white" />
          <span className="text-xs font-medium text-white">Book</span>
        </Link>
      </div>
    </div>
  );
}
