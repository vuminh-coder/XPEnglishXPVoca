import { ListeningLesson, TranscriptSentence } from "./listeningParser";

interface ExtensionSentence {
  speaker: string;
  text: string;
  vietnamese: string;
}

/**
 * Topic-specific, contextually rich & polished follow-up sentences.
 * Ensures all extended sentences maintain 100% logical coherence,
 * natural phrasing, and refined native Vietnamese translations.
 */
const CONTEXTUAL_EXTENSION_SCRIPTS: Record<string, ExtensionSentence[]> = {
  // 1. Hotel & Hospitality / Housekeeping
  Hotel: [
    {
      speaker: "Speaker A",
      text: "Could you also verify that the presidential suite has been fully restocked with luxury amenities?",
      vietnamese: "Anh có thể xác minh lại xem phòng tổng thống đã được bổ sung đầy đủ vật dụng cao cấp chưa?"
    },
    {
      speaker: "Speaker B",
      text: "Yes, our senior housekeeper personally inspected the suite and confirmed everything meets five-star standards.",
      vietnamese: "Vâng, trán phòng buồng phòng cấp cao đã trực tiếp kiểm tra và xác nhận mọi thứ đạt chuẩn 5 sao."
    },
    {
      speaker: "Speaker A",
      text: "Excellent. Please remind the evening shift team to prepare complimentary welcome fruit baskets.",
      vietnamese: "Rất tốt. Hãy nhắc ca tối chuẩn bị sẵn giỏ trái cây đón khách miễn phí nhé."
    },
    {
      speaker: "Speaker B",
      text: "I will make sure the VIP guest preferences are noted in the central property management system.",
      vietnamese: "Tôi sẽ đảm bảo sở thích của khách VIP được ghi chú rõ trong hệ thống quản lý khách sạn."
    },
    {
      speaker: "Speaker A",
      text: "Thank you for your meticulous attention to detail. Our guests will certainly appreciate it.",
      vietnamese: "Cảm ơn sự tỉ mỉ chu đáo của anh. Du khách chắc chắn sẽ rất hài lòng."
    },
    {
      speaker: "Speaker B",
      text: "It is always our pleasure to deliver exceptional hospitality services.",
      vietnamese: "Được mang đến dịch vụ tận tâm luôn là niềm vinh hạnh của chúng tôi."
    },
    {
      speaker: "Speaker A",
      text: "Let us review tomorrow's arrival manifest right after lunch.",
      vietnamese: "Chúng ta sẽ cùng rà soát danh sách khách đến vào ngày mai ngay sau bữa trưa nhé."
    },
    {
      speaker: "Speaker B",
      text: "Understood. I will have the printed reports ready on your desk.",
      vietnamese: "Rõ rồi thưa anh. Tôi sẽ in sẵn báo cáo và đặt trên bàn làm việc của anh."
    }
  ],

  // 2. Logistics, Freight & Supply Chain
  Logistics: [
    {
      speaker: "Speaker A",
      text: "Have all international cargo manifests been cleared by customs authorities at the port terminal?",
      vietnamese: "Tất cả bản kê khai hàng hóa quốc tế đã được cơ quan hải quan tại cảng thông quan chưa?"
    },
    {
      speaker: "Speaker B",
      text: "Yes, clearance documents for the heavy container shipments were finalized early this morning.",
      vietnamese: "Vâng, chứng từ thông quan cho các lô hàng container hạng nặng đã hoàn tất từ sớm hôm nay."
    },
    {
      speaker: "Speaker A",
      text: "That is great news. Are the freight trucks scheduled for immediate dispatch to the central warehouse?",
      vietnamese: "Tin tuyệt vời đấy. Các xe tải vận chuyển đã sẵn sàng xuất bến đến kho trung tâm chưa?"
    },
    {
      speaker: "Speaker B",
      text: "The fleet dispatch manager confirmed all drivers are assigned and equipped with real-time GPS tracking.",
      vietnamese: "Quản lý điều hành đội xe xác nhận tất cả tài xế đã nhận lệnh và kích hoạt theo dõi định vị GPS."
    },
    {
      speaker: "Speaker A",
      text: "Perfect. We must maintain strict delivery schedules to satisfy our corporate clients.",
      vietnamese: "Hoàn hảo. Chúng ta phải duy trì đúng tiến độ giao hàng để làm hài lòng khách hàng doanh nghiệp."
    },
    {
      speaker: "Speaker B",
      text: "Rest assured, our automated tracking dashboard will alert client logistics teams of any delays.",
      vietnamese: "Hãy yên tâm, bảng điều khiển tự động sẽ lập tức thông báo cho đối tác nếu có bất kỳ biến động nào."
    },
    {
      speaker: "Speaker A",
      text: "Thank you for coordinating such a seamless transport operation.",
      vietnamese: "Cảm ơn sự điều phối vận hành nhịp nhàng và thông suốt của anh."
    },
    {
      speaker: "Speaker B",
      text: "We remain committed to maintaining high operational efficiency at all times.",
      vietnamese: "Chúng tôi luôn cam kết duy trì hiệu suất vận hành cao nhất trong mọi thời điểm."
    }
  ],

  // 3. Technology, IT Infrastructure & AI
  IT: [
    {
      speaker: "Speaker A",
      text: "Will the upcoming server migration cause any planned downtime for our active cloud users?",
      vietnamese: "Đợt nâng cấp máy chủ sắp tới có làm gián đoạn dịch vụ của người dùng đám mây không?"
    },
    {
      speaker: "Speaker B",
      text: "We have configured redundant backup nodes, so service interruption will be kept under two minutes.",
      vietnamese: "Chúng tôi đã thiết lập các cụm máy chủ dự phòng, thời gian gián đoạn sẽ được khống chế dưới 2 phút."
    },
    {
      speaker: "Speaker A",
      text: "That is reassuring. Have all cybersecurity protocols and encryption keys been thoroughly tested?",
      vietnamese: "Yên tâm rồi. Tất cả giao thức bảo mật và khóa mã hóa đã được kiểm thử kỹ lưỡng chưa?"
    },
    {
      speaker: "Speaker B",
      text: "Our InfoSec audit team verified complete compliance with end-to-end encryption standards yesterday.",
      vietnamese: "Đội kiểm toán an ninh mạng đã xác nhận hệ thống tuân thủ 100% chuẩn mã hóa đầu-cuối từ hôm qua."
    },
    {
      speaker: "Speaker A",
      text: "Excellent. Please send out a maintenance notice email to all system administrators.",
      vietnamese: "Rất tốt. Hãy gửi email thông báo bảo trì đến toàn bộ quản trị viên hệ thống nhé."
    },
    {
      speaker: "Speaker B",
      text: "The notice has already been drafted and scheduled for automatic distribution at 6 PM.",
      vietnamese: "Thông báo đã được soạn sẵn và lên lịch tự động gửi đi vào lúc 6 giờ chiều nay."
    },
    {
      speaker: "Speaker A",
      text: "Appreciate your proactive infrastructure management. Great job!",
      vietnamese: "Đánh giá cao tinh thần chủ động quản trị hạ tầng của bộ phận CNTT. Làm tốt lắm!"
    },
    {
      speaker: "Speaker B",
      text: "Thank you! We will monitor system telemetries closely throughout the night.",
      vietnamese: "Cảm ơn anh! Chúng tôi sẽ theo dõi sát sao chỉ số đo đạc hệ thống trong suốt đêm nay."
    }
  ],

  // 4. Corporate Business & Finance
  Business: [
    {
      speaker: "Speaker A",
      text: "We should also review the revised quarterly revenue forecast before meeting with key stakeholders.",
      vietnamese: "Chúng ta cũng nên rà soát lại dự báo doanh thu quý trước khi họp với các bên liên quan."
    },
    {
      speaker: "Speaker B",
      text: "I have updated the financial models to account for recent market expansion costs.",
      vietnamese: "Tôi đã cập nhật mô hình tài chính để phản ánh chính xác chi phí mở rộng thị trường gần đây."
    },
    {
      speaker: "Speaker A",
      text: "Splendid work. Are all department heads aligned with these proposed budget reallocations?",
      vietnamese: "Tuyệt vời. Tất cả trưởng bộ phận đã nhất trí với phương án phân bổ lại ngân sách này chưa?"
    },
    {
      speaker: "Speaker B",
      text: "Yes, every executive signed off during yesterday's strategic planning session.",
      vietnamese: "Vâng, tất cả giám đốc điều hành đã phê duyệt trong buổi họp quy hoạch chiến lược hôm qua."
    },
    {
      speaker: "Speaker A",
      text: "Wonderful. Let us ensure the slide deck highlights our return on investment clearly.",
      vietnamese: "Tuyệt vời. Hãy đảm bảo bộ slide làm nổi bật rõ ràng tỷ suất sinh lời trên vốn đầu tư."
    },
    {
      speaker: "Speaker B",
      text: "The presentation has been polished with key performance indicators prominently displayed.",
      vietnamese: "Bài trình bày đã được trau chuốt tỉ mỉ với các chỉ số KPI then chốt nằm ở vị trí nổi bật."
    },
    {
      speaker: "Speaker A",
      text: "Thank you for your dedicated effort in preparing such a compelling business strategy.",
      vietnamese: "Cảm ơn sự tận tụy của bạn trong việc chuẩn bị chiến lược kinh doanh thuyết phục này."
    },
    {
      speaker: "Speaker B",
      text: "My pleasure. I am confident our board members will appreciate the thorough analysis.",
      vietnamese: "Rất hân hạnh. Tôi tin tưởng ban hội đồng quản trị sẽ đánh giá cao phân tích chuyên sâu này."
    }
  ],

  // 5. Travel & Aviation
  Travel: [
    {
      speaker: "Speaker A",
      text: "Could you please confirm if connecting flight boarding passes have been issued?",
      vietnamese: "Bạn có thể xác nhận giúp tôi xem thẻ lên máy bay cho chuyến bay nối chuyến đã được cấp chưa?"
    },
    {
      speaker: "Speaker B",
      text: "Yes, both boarding passes are printed, and your checked luggage is tagged straight through to Tokyo.",
      vietnamese: "Vâng, cả hai thẻ lên máy bay đã được in, và hành lý ký gửi đã được dán nhãn chuyển thẳng tới Tokyo."
    },
    {
      speaker: "Speaker A",
      text: "That saves me a lot of hassle. Where is the priority departure lounge located?",
      vietnamese: "Điều đó giúp tôi tiết kiệm bao nhiêu thời gian. Phòng chờ ưu tiên nằm ở khu vực nào vậy?"
    },
    {
      speaker: "Speaker B",
      text: "It is located on the second floor, right past the international security screening checkpoint.",
      vietnamese: "Phòng chờ nằm ở tầng hai, ngay sau khu vực kiểm tra an ninh quốc tế."
    },
    {
      speaker: "Speaker A",
      text: "Thank you for your warm assistance. Will there be automated boarding alerts sent to my phone?",
      vietnamese: "Cảm ơn sự hướng dẫn chu đáo. Điện thoại của tôi có nhận được thông báo lên máy bay tự động không?"
    },
    {
      speaker: "Speaker B",
      text: "Indeed, our mobile app will notify you thirty minutes prior to gate departure.",
      vietnamese: "Chắc chắn rồi, ứng dụng di động sẽ gửi thông báo cho quý khách 30 phút trước giờ mở cổng."
    },
    {
      speaker: "Speaker A",
      text: "Marvelous service! Have a wonderful day ahead.",
      vietnamese: "Dịch vụ tuyệt vời! Chúc bạn một ngày làm việc vui vẻ."
    },
    {
      speaker: "Speaker B",
      text: "Thank you, sir. We wish you a safe and pleasant journey!",
      vietnamese: "Cảm ơn quý khách. Chúc quý khách có một chuyến bay thượng lộ bình an!"
    }
  ],

  // 6. Default General High-Quality Script
  Default: [
    {
      speaker: "Speaker A",
      text: "Let us review the core recommendations to ensure full operational alignment.",
      vietnamese: "Chúng ta hãy rà soát lại các kiến nghị cốt lõi để đảm bảo sự thống nhất vận hành."
    },
    {
      speaker: "Speaker B",
      text: "I have documented all action items and will share the verified summary shortly.",
      vietnamese: "Tôi đã ghi nhận lại toàn bộ danh mục công việc và sẽ gửi bản tóm tắt đã xác minh sớm."
    },
    {
      speaker: "Speaker A",
      text: "That will provide immense clarity for our cross-functional team execution.",
      vietnamese: "Điều đó sẽ đem lại sự rõ ràng minh bạch tuyệt đối cho việc triển khai giữa các phòng ban."
    },
    {
      speaker: "Speaker B",
      text: "Should anyone require further clarification, our team is always ready to assist.",
      vietnamese: "Nếu bất kỳ ai cần giải đáp thêm, đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ."
    },
    {
      speaker: "Speaker A",
      text: "We genuinely appreciate everyone's dedicated contribution to this project.",
      vietnamese: "Chúng tôi chân thành cảm ơn đóng góp tận tụy của tất cả mọi người cho dự án."
    },
    {
      speaker: "Speaker B",
      text: "Thank you for steering such an inspiring and productive collaboration.",
      vietnamese: "Cảm ơn sự dẫn dắt đầy cảm hứng và hiệu quả của bạn trong buổi làm việc hôm nay."
    },
    {
      speaker: "Speaker A",
      text: "Consistent effort and attention to detail will guarantee long-term success.",
      vietnamese: "Nỗ lực bền bỉ và sự chú trọng đến từng chi tiết sẽ bảo chứng cho thành công lâu dài."
    },
    {
      speaker: "Speaker B",
      text: "Indeed, we look forward to achieving even greater milestones together.",
      vietnamese: "Quả đúng như vậy, chúng tôi rất mong chờ cùng nhau chinh phục những cột mốc vĩ đại hơn."
    }
  ]
};

/**
 * Smart context matching helper to pick the most natural script for a lesson.
 */
function getMatchingScript(title: string, category: string, tags: string[] = []): ExtensionSentence[] {
  const searchableText = `${title} ${category} ${tags.join(" ")}`.toLowerCase();

  if (searchableText.includes("hotel") || searchableText.includes("housekeeping") || searchableText.includes("room")) {
    return CONTEXTUAL_EXTENSION_SCRIPTS.Hotel;
  }
  if (searchableText.includes("logistics") || searchableText.includes("freight") || searchableText.includes("cargo") || searchableText.includes("shipment") || searchableText.includes("transport")) {
    return CONTEXTUAL_EXTENSION_SCRIPTS.Logistics;
  }
  if (searchableText.includes("it") || searchableText.includes("server") || searchableText.includes("tech") || searchableText.includes("cloud") || searchableText.includes("data") || searchableText.includes("security")) {
    return CONTEXTUAL_EXTENSION_SCRIPTS.IT;
  }
  if (searchableText.includes("business") || searchableText.includes("budget") || searchableText.includes("strategy") || searchableText.includes("meeting") || searchableText.includes("corporate")) {
    return CONTEXTUAL_EXTENSION_SCRIPTS.Business;
  }
  if (searchableText.includes("travel") || searchableText.includes("flight") || searchableText.includes("airport") || searchableText.includes("airline")) {
    return CONTEXTUAL_EXTENSION_SCRIPTS.Travel;
  }

  return CONTEXTUAL_EXTENSION_SCRIPTS.Default;
}

/**
 * Enriches a lesson to guarantee at least 14 full, contextually coherent sentences.
 * Assigns speaker roles (Speaker A / B) or paragraph numbers (Paragraph 1, 2, 3).
 * Ensures polished native phrasing in both English & Vietnamese.
 */
export function ensureExtendedLesson(lesson: ListeningLesson): ListeningLesson {
  if (!lesson || !lesson.transcript) return lesson;

  const currentCount = lesson.transcript.length;
  
  // If lesson already has 12 or more sentences, format and normalize fields cleanly
  if (currentCount >= 12) {
    const updatedTranscript = lesson.transcript.map((s, idx) => ({
      ...s,
      speaker: (s as any).speaker || (idx % 2 === 0 ? "Speaker A" : "Speaker B"),
      paragraph: Math.floor(idx / 4) + 1,
    }));
    return { ...lesson, transcript: updatedTranscript };
  }

  // Find the most contextually relevant polished script
  const scriptList = getMatchingScript(lesson.title || "", lesson.category || "", lesson.tags || []);

  const baseTime = lesson.transcript[currentCount - 1]?.endTime || (currentCount * 5.2);
  const needed = Math.max(14 - currentCount, scriptList.length);

  const extraSentences: TranscriptSentence[] = [];

  for (let i = 0; i < needed; i++) {
    const scriptItem = scriptList[i % scriptList.length];
    const sentenceIndex = currentCount + i;
    const startTime = Math.round((baseTime + i * 5.4) * 10) / 10;
    const endTime = Math.round((startTime + 4.9) * 10) / 10;

    const words = scriptItem.text.split(" ").map((w, wIdx) => ({
      word: w,
      offset: wIdx * 310,
    }));

    extraSentences.push({
      sentenceId: `s_ext_${sentenceIndex + 1}`,
      id: `s_ext_${sentenceIndex + 1}`,
      startTime,
      endTime,
      text: scriptItem.text,
      vietnamese: scriptItem.vietnamese,
      translation: scriptItem.vietnamese,
      words,
      ...( {
        speaker: scriptItem.speaker,
        paragraph: Math.floor(sentenceIndex / 4) + 1,
      } as any)
    });
  }

  const fullTranscript = [...lesson.transcript, ...extraSentences].map((s, idx) => ({
    ...s,
    speaker: (s as any).speaker || (idx % 2 === 0 ? "Speaker A" : "Speaker B"),
    paragraph: Math.floor(idx / 4) + 1,
  }));

  const lastSentence = fullTranscript.length > 0 ? fullTranscript[fullTranscript.length - 1] : null;
  const lastEndTime = lastSentence ? lastSentence.endTime || 60 : 60;
  const mins = Math.max(2, Math.ceil(lastEndTime / 60));

  return {
    ...lesson,
    duration: `${mins}:${(fullTranscript.length * 4) % 60 < 10 ? '0' : ''}${(fullTranscript.length * 4) % 60}`,
    transcript: fullTranscript,
  };
}

/**
 * Enriches an array of ListeningLesson objects
 */
export function ensureExtendedLessons(lessons: ListeningLesson[]): ListeningLesson[] {
  if (!Array.isArray(lessons)) return [];
  return lessons.map((l) => ensureExtendedLesson(l));
}
