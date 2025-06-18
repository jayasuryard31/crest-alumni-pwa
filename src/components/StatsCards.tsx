
import { Users, GraduationCap, Briefcase, MapPin } from "lucide-react";

interface StatsCardsProps {
  totalAlumni: number;
}

const StatsCards = ({ totalAlumni }: StatsCardsProps) => {
  const stats = [
    {
      title: "Total Alumni",
      value: totalAlumni.toString(),
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Departments",
      value: "12+",
      icon: GraduationCap,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Companies",
      value: "50+",
      icon: Briefcase,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Cities",
      value: "25+",
      icon: MapPin,
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} mb-3`}>
            <stat.icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
          <p className="text-sm text-gray-600">{stat.title}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
