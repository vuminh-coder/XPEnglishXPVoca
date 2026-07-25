import { NextResponse } from "next/server";
import { lookupWordDeep } from "@/lib/utils/deepDictionary";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const word = searchParams.get("word");

    if (!word) {
      return NextResponse.json({ success: false, error: "Thiếu tham số từ vựng 'word'" }, { status: 400 });
    }

    const definition = lookupWordDeep(word);

    return NextResponse.json({
      success: true,
      data: definition,
    });
  } catch (error) {
    console.error("Deep Dictionary Lookup Error:", error);
    return NextResponse.json({ success: false, error: "Lỗi tra cứu từ điển" }, { status: 500 });
  }
}
