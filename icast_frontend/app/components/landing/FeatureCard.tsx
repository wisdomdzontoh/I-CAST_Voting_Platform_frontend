// app/components/landing/FeatureCard.tsx
import Image from "next/image";

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string; }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
    <Image src={icon} alt={`${title} Icon`} width={70} height={70} />
    <h4 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h4>
    <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

export default FeatureCard;
