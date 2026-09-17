import React from "react";
import {
  Cpu,
  Stethoscope,
  Coins,
  Scale,
  TreePine,
  MessageSquare,
  Plane,
  Brain,
  Palette,
  Trophy,
  Users,
  Home,
  Utensils,
  Apple,
  Coffee,
  Briefcase,
  GraduationCap,
  Shirt,
  CloudSun,
  Car,
  Bus,
  Dog,
  Clock,
  Activity,
  Calculator,
  ShieldCheck,
  BookMarked,
  Sparkles,
  Compass,
  Award,
  Target,
  Layers,
} from "lucide-react";

export function getSemanticThemeIcon(theme: { id: string; name: string; nameEn?: string }) {
  const text = `${theme.name} ${theme.nameEn || ""}`.toLowerCase();

  if (text.includes("cntt") || text.includes("ai") || text.includes("lập trình") || text.includes("it")) {
    return <Cpu className="w-5 h-5 text-sky-500" />;
  }
  if (text.includes("y tế") || text.includes("healthcare") || text.includes("bệnh") || text.includes("dược")) {
    return <Stethoscope className="w-5 h-5 text-rose-500" />;
  }
  if (text.includes("tài chính") || text.includes("finance") || text.includes("ngân hàng") || text.includes("tiền")) {
    return <Coins className="w-5 h-5 text-emerald-600" />;
  }
  if (text.includes("luật") || text.includes("law") || text.includes("pháp") || text.includes("tư pháp")) {
    return <Scale className="w-5 h-5 text-indigo-600" />;
  }
  if (text.includes("môi trường") || text.includes("environment") || text.includes("sinh thái") || text.includes("rừng")) {
    return <TreePine className="w-5 h-5 text-emerald-600" />;
  }
  if (text.includes("marketing") || text.includes("quảng cáo") || text.includes("truyền thông")) {
    return <MessageSquare className="w-5 h-5 text-amber-500" />;
  }
  if (text.includes("du lịch") || text.includes("travel") || text.includes("hàng không") || text.includes("sân bay")) {
    return <Plane className="w-5 h-5 text-cyan-500" />;
  }
  if (text.includes("khoa học") || text.includes("science") || text.includes("vũ trụ") || text.includes("nghiên cứu")) {
    return <Brain className="w-5 h-5 text-purple-600" />;
  }
  if (text.includes("nghệ thuật") || text.includes("art") || text.includes("thiết kế") || text.includes("màu sắc")) {
    return <Palette className="w-5 h-5 text-pink-500" />;
  }
  if (text.includes("thể thao") || text.includes("sports") || text.includes("thi đấu") || text.includes("bóng")) {
    return <Trophy className="w-5 h-5 text-orange-500" />;
  }
  if (text.includes("gia đình") || text.includes("family") || text.includes("con người") || text.includes("bạn bè") || text.includes("quan hệ")) {
    return <Users className="w-5 h-5 text-blue-500" />;
  }
  if (text.includes("nhà") || text.includes("house") || text.includes("home") || text.includes("nội thất") || text.includes("phòng")) {
    return <Home className="w-5 h-5 text-emerald-600" />;
  }
  if (text.includes("thực phẩm") || text.includes("food") || text.includes("ăn uống") || text.includes("ẩm thực") || text.includes("bánh")) {
    return <Utensils className="w-5 h-5 text-rose-500" />;
  }
  if (text.includes("hoa quả") || text.includes("fruit") || text.includes("trái cây") || text.includes("cây cối")) {
    return <Apple className="w-5 h-5 text-pink-600" />;
  }
  if (text.includes("đồ uống") || text.includes("drink") || text.includes("cà phê") || text.includes("trà")) {
    return <Coffee className="w-5 h-5 text-amber-700" />;
  }
  if (text.includes("nghề") || text.includes("occupation") || text.includes("công việc") || text.includes("work") || text.includes("văn phòng") || text.includes("kinh doanh")) {
    return <Briefcase className="w-5 h-5 text-amber-500" />;
  }
  if (text.includes("trường") || text.includes("school") || text.includes("giáo dục") || text.includes("education") || text.includes("học tập")) {
    return <GraduationCap className="w-5 h-5 text-indigo-500" />;
  }
  if (text.includes("quần áo") || text.includes("clothing") || text.includes("thời trang") || text.includes("trang phục") || text.includes("phụ kiện")) {
    return <Shirt className="w-5 h-5 text-pink-500" />;
  }
  if (text.includes("thời tiết") || text.includes("weather") || text.includes("khí hậu") || text.includes("thiên tai")) {
    return <CloudSun className="w-5 h-5 text-sky-400" />;
  }
  if (text.includes("phương tiện") || text.includes("transport") || text.includes("giao thông") || text.includes("xe") || text.includes("car")) {
    return <Car className="w-5 h-5 text-purple-500" />;
  }
  if (text.includes("xe buýt") || text.includes("bus") || text.includes("nhà ga")) {
    return <Bus className="w-5 h-5 text-amber-600" />;
  }
  if (text.includes("động vật") || text.includes("animal") || text.includes("thú") || text.includes("sinh vật") || text.includes("côn trùng")) {
    return <Dog className="w-5 h-5 text-teal-500" />;
  }
  if (text.includes("thời gian") || text.includes("time") || text.includes("lịch") || text.includes("giờ")) {
    return <Clock className="w-5 h-5 text-rose-500" />;
  }
  if (text.includes("cơ thể") || text.includes("body") || text.includes("cảm giác") || text.includes("vận động")) {
    return <Activity className="w-5 h-5 text-emerald-500" />;
  }
  if (text.includes("số") || text.includes("number") || text.includes("đo lường") || text.includes("hình học")) {
    return <Calculator className="w-5 h-5 text-blue-600" />;
  }
  if (text.includes("an toàn") || text.includes("safety") || text.includes("cảnh báo") || text.includes("luật lệ")) {
    return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
  }

  const POOL = [
    <BookMarked key="b1" className="w-5 h-5 text-[#0059bb]" />,
    <Sparkles key="b2" className="w-5 h-5 text-purple-500" />,
    <Compass key="b3" className="w-5 h-5 text-amber-500" />,
    <Award key="b4" className="w-5 h-5 text-emerald-500" />,
    <Target key="b5" className="w-5 h-5 text-rose-500" />,
    <Layers key="b7" className="w-5 h-5 text-indigo-500" />,
  ];

  const sum = theme.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return POOL[sum % POOL.length];
}
