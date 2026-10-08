/**
 * =========================================================================
 * KHO TỪ VỰNG TIẾNG ANH CƠ BẢN THEO CHỦ ĐỀ (A1 - A2 TOPIC MODULES)
 * =========================================================================
 * Toàn bộ 60 chủ đề từ vựng được phân tách thành từng file ChuDe....ts độc lập.
 */

import { BasicTheme, BasicVocabularyItem, VocabularyTopicPackage } from "../types";

// Re-export core types
export * from "../types";

// 1. Import all 60 individual topic modules
import { THEME_CHAO_HOI_GIAO_TIEP, VOCABS_CHAO_HOI_GIAO_TIEP, CHUDE_CHAO_HOI_GIAO_TIEP } from "./ChuDeChaoHoiGiaoTiep";
import { THEME_GIOI_THIEU_DAI_TU, VOCABS_GIOI_THIEU_DAI_TU, CHUDE_GIOI_THIEU_DAI_TU } from "./ChuDeGioiThieuDaiTu";
import { THEME_SO_DEM_THU_TU, VOCABS_SO_DEM_THU_TU, CHUDE_SO_DEM_THU_TU } from "./ChuDeSoDemThuTu";
import { THEME_MAU_SAC_HINH_KHOI, VOCABS_MAU_SAC_HINH_KHOI, CHUDE_MAU_SAC_HINH_KHOI } from "./ChuDeMauSacHinhKhoi";
import { THEME_GIA_DINH_NGUOI_THAN, VOCABS_GIA_DINH_NGUOI_THAN, CHUDE_GIA_DINH_NGUOI_THAN } from "./ChuDeGiaDinhNguoiThan";
import { THEME_NHA_CUA_DO_DUNG, VOCABS_NHA_CUA_DO_DUNG, CHUDE_NHA_CUA_DO_DUNG } from "./ChuDeNhaCuaDoDung";
import { THEME_DONG_TU_HANG_NGAY, VOCABS_DONG_TU_HANG_NGAY, CHUDE_DONG_TU_HANG_NGAY } from "./ChuDeDongTuHangNgay";
import { THEME_AN_UONG_THUC_PHAM, VOCABS_AN_UONG_THUC_PHAM, CHUDE_AN_UONG_THUC_PHAM } from "./ChuDeAnUongThucPham";
import { THEME_CAM_XUC_TINH_TU, VOCABS_CAM_XUC_TINH_TU, CHUDE_CAM_XUC_TINH_TU } from "./ChuDeCamXucTinhTu";
import { THEME_THOI_GIAN_LICH, VOCABS_THOI_GIAN_LICH, CHUDE_THOI_GIAN_LICH } from "./ChuDeThoiGianLich";
import { THEME_DONG_VAT_QUEN_THUOC, VOCABS_DONG_VAT_QUEN_THUOC, CHUDE_DONG_VAT_QUEN_THUOC } from "./ChuDeDongVatQuenThuoc";
import { THEME_BO_PHAN_CO_THE, VOCABS_BO_PHAN_CO_THE, CHUDE_BO_PHAN_CO_THE } from "./ChuDeBoPhanCoThe";
import { THEME_TRANG_PHUC_CO_BAN, VOCABS_TRANG_PHUC_CO_BAN, CHUDE_TRANG_PHUC_CO_BAN } from "./ChuDeTrangPhucCoBan";
import { THEME_DIA_DIEM_CHI_DUONG, VOCABS_DIA_DIEM_CHI_DUONG, CHUDE_DIA_DIEM_CHI_DUONG } from "./ChuDeDiaDiemChiDuong";
import { THEME_THOI_TIET_THIEN_NHIEN, VOCABS_THOI_TIET_THIEN_NHIEN, CHUDE_THOI_TIET_THIEN_NHIEN } from "./ChuDeThoiTietThienNhien";
import { THEME_NGHE_NGHIEP_VIEC_LAM, VOCABS_NGHE_NGHIEP_VIEC_LAM, CHUDE_NGHE_NGHIEP_VIEC_LAM } from "./ChuDeNgheNghiepViecLam";
import { THEME_PHUONG_TIEN_GIAO_THONG, VOCABS_PHUONG_TIEN_GIAO_THONG, CHUDE_PHUONG_TIEN_GIAO_THONG } from "./ChuDePhuongTienGiaoThong";
import { THEME_TRUONG_HOC_DUNG_CU, VOCABS_TRUONG_HOC_DUNG_CU, CHUDE_TRUONG_HOC_DUNG_CU } from "./ChuDeTruongHocDungCu";
import { THEME_SO_THICH_THE_THAO, VOCABS_SO_THICH_THE_THAO, CHUDE_SO_THICH_THE_THAO } from "./ChuDeSoThichTheThao";
import { THEME_MUA_SAM_TIEN_TE, VOCABS_MUA_SAM_TIEN_TE, CHUDE_MUA_SAM_TIEN_TE } from "./ChuDeMuaSamTienTe";
import { THEME_CAY_COI_HOA_QUA, VOCABS_CAY_COI_HOA_QUA, CHUDE_CAY_COI_HOA_QUA } from "./ChuDeCayCoiHoaQua";
import { THEME_SUC_KHOE_Y_TE, VOCABS_SUC_KHOE_Y_TE, CHUDE_SUC_KHOE_Y_TE } from "./ChuDeSucKhoeYTe";
import { THEME_DUNG_CU_NHA_BEP, VOCABS_DUNG_CU_NHA_BEP, CHUDE_DUNG_CU_NHA_BEP } from "./ChuDeDungCuNhaBep";
import { THEME_VAN_PHONG_CONG_NGHE, VOCABS_VAN_PHONG_CONG_NGHE, CHUDE_VAN_PHONG_CONG_NGHE } from "./ChuDeVanPhongCongNghe";
import { THEME_THANH_PHO_CONG_TRINH, VOCABS_THANH_PHO_CONG_TRINH, CHUDE_THANH_PHO_CONG_TRINH } from "./ChuDeThanhPhoCongTrinh";
import { THEME_TINH_CACH_PHAM_CHAT, VOCABS_TINH_CACH_PHAM_CHAT, CHUDE_TINH_CACH_PHAM_CHAT } from "./ChuDeTinhCachPhamChat";
import { THEME_GIOI_TU_VI_TRI, VOCABS_GIOI_TU_VI_TRI, CHUDE_GIOI_TU_VI_TRI } from "./ChuDeGioiTuViTri";
import { THEME_GIAC_QUAN_CAM_NHAN, VOCABS_GIAC_QUAN_CAM_NHAN, CHUDE_GIAC_QUAN_CAM_NHAN } from "./ChuDeGiacQuanCamNhan";
import { THEME_KY_NGHI_DU_LICH, VOCABS_KY_NGHI_DU_LICH, CHUDE_KY_NGHI_DU_LICH } from "./ChuDeKyNghiDuLich";
import { THEME_GIAI_TRI_NGHE_THUAT, VOCABS_GIAI_TRI_NGHE_THUAT, CHUDE_GIAI_TRI_NGHE_THUAT } from "./ChuDeGiaiTriNgheThuat";
import { THEME_DO_LUONG_KICH_CO, VOCABS_DO_LUONG_KICH_CO, CHUDE_DO_LUONG_KICH_CO } from "./ChuDeDoLuongKichCo";
import { THEME_DUNG_CU_SUA_CHUA, VOCABS_DUNG_CU_SUA_CHUA, CHUDE_DUNG_CU_SUA_CHUA } from "./ChuDeDungCuSuaChua";
import { THEME_THIEN_TAI_THOI_TIET_XAU, VOCABS_THIEN_TAI_THOI_TIET_XAU, CHUDE_THIEN_TAI_THOI_TIET_XAU } from "./ChuDeThienTaiThoiTietXau";
import { THEME_DIA_HINH_CANH_QUAN, VOCABS_DIA_HINH_CANH_QUAN, CHUDE_DIA_HINH_CANH_QUAN } from "./ChuDeDiaHinhCanhQuan";
import { THEME_SINH_VAT_BIEN_DAI_DUONG, VOCABS_SINH_VAT_BIEN_DAI_DUONG, CHUDE_SINH_VAT_BIEN_DAI_DUONG } from "./ChuDeSinhVatBienDaiDuong";
import { THEME_CON_TRUNG_SAU_BO, VOCABS_CON_TRUNG_SAU_BO, CHUDE_CON_TRUNG_SAU_BO } from "./ChuDeConTrungSauBo";
import { THEME_GIA_VI_HUONG_VI, VOCABS_GIA_VI_HUONG_VI, CHUDE_GIA_VI_HUONG_VI } from "./ChuDeGiaViHuongVi";
import { THEME_BANH_NGOT_TRANG_MIENG, VOCABS_BANH_NGOT_TRANG_MIENG, CHUDE_BANH_NGOT_TRANG_MIENG } from "./ChuDeBanhNgotTrangMieng";
import { THEME_DO_UONG_TRA_SUA, VOCABS_DO_UONG_TRA_SUA, CHUDE_DO_UONG_TRA_SUA } from "./ChuDeDoUongTraSua";
import { THEME_DON_DEP_VIEC_NHA, VOCABS_DON_DEP_VIEC_NHA, CHUDE_DON_DEP_VIEC_NHA } from "./ChuDeDonDepViecNha";
import { THEME_PHU_KIEN_THOI_TRANG, VOCABS_PHU_KIEN_THOI_TRANG, CHUDE_PHU_KIEN_THOI_TRANG } from "./ChuDePhuKienThoiTrang";
import { THEME_PHONG_NGU_GIAC_NGU, VOCABS_PHONG_NGU_GIAC_NGU, CHUDE_PHONG_NGU_GIAC_NGU } from "./ChuDePhongNguGiacNgu";
import { THEME_PHONG_TAM_VE_SINH, VOCABS_PHONG_TAM_VE_SINH, CHUDE_PHONG_TAM_VE_SINH } from "./ChuDePhongTamVeSinh";
import { THEME_CAM_GIAC_CO_THE, VOCABS_CAM_GIAC_CO_THE, CHUDE_CAM_GIAC_CO_THE } from "./ChuDeCamGiacCoThe";
import { THEME_CAM_XUC_THAI_DO, VOCABS_CAM_XUC_THAI_DO, CHUDE_CAM_XUC_THAI_DO } from "./ChuDeCamXucThaiDo";
import { THEME_MOI_QUAN_HE_XA_HOI, VOCABS_MOI_QUAN_HE_XA_HOI, CHUDE_MOI_QUAN_HE_XA_HOI } from "./ChuDeMoiQuanHeXaHoi";
import { THEME_GIAO_TIEP_THU_TIN, VOCABS_GIAO_TIEP_THU_TIN, CHUDE_GIAO_TIEP_THU_TIN } from "./ChuDeGiaoTiepThuTin";
import { THEME_HINH_HOC_HOA_TIET, VOCABS_HINH_HOC_HOA_TIET, CHUDE_HINH_HOC_HOA_TIET } from "./ChuDeHinhHocHoaTiet";
import { THEME_CHAT_LIEU_VAT_LIEU, VOCABS_CHAT_LIEU_VAT_LIEU, CHUDE_CHAT_LIEU_VAT_LIEU } from "./ChuDeChatLieuVatLieu";
import { THEME_AM_THANH_NHAC_CU, VOCABS_AM_THANH_NHAC_CU, CHUDE_AM_THANH_NHAC_CU } from "./ChuDeAmThanhNhacCu";
import { THEME_ANH_SANG_THI_GIAC, VOCABS_ANH_SANG_THI_GIAC, CHUDE_ANH_SANG_THI_GIAC } from "./ChuDeAnhSangThiGiac";
import { THEME_VAN_DONG_CO_THE, VOCABS_VAN_DONG_CO_THE, CHUDE_VAN_DONG_CO_THE } from "./ChuDeVanDongCoThe";
import { THEME_DICH_VU_TIEN_ICH, VOCABS_DICH_VU_TIEN_ICH, CHUDE_DICH_VU_TIEN_ICH } from "./ChuDeDichVuTienIch";
import { THEME_SAN_BAY_NHA_GA, VOCABS_SAN_BAY_NHA_GA, CHUDE_SAN_BAY_NHA_GA } from "./ChuDeSanBayNhaGa";
import { THEME_KHACH_SAN_LUU_TRU, VOCABS_KHACH_SAN_LUU_TRU, CHUDE_KHACH_SAN_LUU_TRU } from "./ChuDeKhachSanLuuTru";
import { THEME_AM_THUC_DUONG_PHO, VOCABS_AM_THUC_DUONG_PHO, CHUDE_AM_THUC_DUONG_PHO } from "./ChuDeAmThucDuongPho";
import { THEME_GIAI_DOAN_CUOC_DOI, VOCABS_GIAI_DOAN_CUOC_DOI, CHUDE_GIAI_DOAN_CUOC_DOI } from "./ChuDeGiaiDoanCuocDoi";
import { THEME_LE_HOI_PHONG_TUC, VOCABS_LE_HOI_PHONG_TUC, CHUDE_LE_HOI_PHONG_TUC } from "./ChuDeLeHoiPhongTuc";
import { THEME_AN_TOAN_LUAT_LE, VOCABS_AN_TOAN_LUAT_LE, CHUDE_AN_TOAN_LUAT_LE } from "./ChuDeAnToanLuatLe";
import { THEME_THIET_BI_GIA_DUNG, VOCABS_THIET_BI_GIA_DUNG, CHUDE_THIET_BI_GIA_DUNG } from "./ChuDeThietBiGiaDung";

// 2. Re-export all 60 individual topic modules
export * from "./ChuDeChaoHoiGiaoTiep";
export * from "./ChuDeGioiThieuDaiTu";
export * from "./ChuDeSoDemThuTu";
export * from "./ChuDeMauSacHinhKhoi";
export * from "./ChuDeGiaDinhNguoiThan";
export * from "./ChuDeNhaCuaDoDung";
export * from "./ChuDeDongTuHangNgay";
export * from "./ChuDeAnUongThucPham";
export * from "./ChuDeCamXucTinhTu";
export * from "./ChuDeThoiGianLich";
export * from "./ChuDeDongVatQuenThuoc";
export * from "./ChuDeBoPhanCoThe";
export * from "./ChuDeTrangPhucCoBan";
export * from "./ChuDeDiaDiemChiDuong";
export * from "./ChuDeThoiTietThienNhien";
export * from "./ChuDeNgheNghiepViecLam";
export * from "./ChuDePhuongTienGiaoThong";
export * from "./ChuDeTruongHocDungCu";
export * from "./ChuDeSoThichTheThao";
export * from "./ChuDeMuaSamTienTe";
export * from "./ChuDeCayCoiHoaQua";
export * from "./ChuDeSucKhoeYTe";
export * from "./ChuDeDungCuNhaBep";
export * from "./ChuDeVanPhongCongNghe";
export * from "./ChuDeThanhPhoCongTrinh";
export * from "./ChuDeTinhCachPhamChat";
export * from "./ChuDeGioiTuViTri";
export * from "./ChuDeGiacQuanCamNhan";
export * from "./ChuDeKyNghiDuLich";
export * from "./ChuDeGiaiTriNgheThuat";
export * from "./ChuDeDoLuongKichCo";
export * from "./ChuDeDungCuSuaChua";
export * from "./ChuDeThienTaiThoiTietXau";
export * from "./ChuDeDiaHinhCanhQuan";
export * from "./ChuDeSinhVatBienDaiDuong";
export * from "./ChuDeConTrungSauBo";
export * from "./ChuDeGiaViHuongVi";
export * from "./ChuDeBanhNgotTrangMieng";
export * from "./ChuDeDoUongTraSua";
export * from "./ChuDeDonDepViecNha";
export * from "./ChuDePhuKienThoiTrang";
export * from "./ChuDePhongNguGiacNgu";
export * from "./ChuDePhongTamVeSinh";
export * from "./ChuDeCamGiacCoThe";
export * from "./ChuDeCamXucThaiDo";
export * from "./ChuDeMoiQuanHeXaHoi";
export * from "./ChuDeGiaoTiepThuTin";
export * from "./ChuDeHinhHocHoaTiet";
export * from "./ChuDeChatLieuVatLieu";
export * from "./ChuDeAmThanhNhacCu";
export * from "./ChuDeAnhSangThiGiac";
export * from "./ChuDeVanDongCoThe";
export * from "./ChuDeDichVuTienIch";
export * from "./ChuDeSanBayNhaGa";
export * from "./ChuDeKhachSanLuuTru";
export * from "./ChuDeAmThucDuongPho";
export * from "./ChuDeGiaiDoanCuocDoi";
export * from "./ChuDeLeHoiPhongTuc";
export * from "./ChuDeAnToanLuatLe";
export * from "./ChuDeThietBiGiaDung";

// 3. Consolidated Themes List (Exact 60 Topics preserved)
export const ALL_BASIC_VOCABULARY_THEMES: BasicTheme[] = [
  THEME_CHAO_HOI_GIAO_TIEP,
  THEME_GIOI_THIEU_DAI_TU,
  THEME_SO_DEM_THU_TU,
  THEME_MAU_SAC_HINH_KHOI,
  THEME_GIA_DINH_NGUOI_THAN,
  THEME_NHA_CUA_DO_DUNG,
  THEME_DONG_TU_HANG_NGAY,
  THEME_AN_UONG_THUC_PHAM,
  THEME_CAM_XUC_TINH_TU,
  THEME_THOI_GIAN_LICH,
  THEME_DONG_VAT_QUEN_THUOC,
  THEME_BO_PHAN_CO_THE,
  THEME_TRANG_PHUC_CO_BAN,
  THEME_DIA_DIEM_CHI_DUONG,
  THEME_THOI_TIET_THIEN_NHIEN,
  THEME_NGHE_NGHIEP_VIEC_LAM,
  THEME_PHUONG_TIEN_GIAO_THONG,
  THEME_TRUONG_HOC_DUNG_CU,
  THEME_SO_THICH_THE_THAO,
  THEME_MUA_SAM_TIEN_TE,
  THEME_CAY_COI_HOA_QUA,
  THEME_SUC_KHOE_Y_TE,
  THEME_DUNG_CU_NHA_BEP,
  THEME_VAN_PHONG_CONG_NGHE,
  THEME_THANH_PHO_CONG_TRINH,
  THEME_TINH_CACH_PHAM_CHAT,
  THEME_GIOI_TU_VI_TRI,
  THEME_GIAC_QUAN_CAM_NHAN,
  THEME_KY_NGHI_DU_LICH,
  THEME_GIAI_TRI_NGHE_THUAT,
  THEME_DO_LUONG_KICH_CO,
  THEME_DUNG_CU_SUA_CHUA,
  THEME_THIEN_TAI_THOI_TIET_XAU,
  THEME_DIA_HINH_CANH_QUAN,
  THEME_SINH_VAT_BIEN_DAI_DUONG,
  THEME_CON_TRUNG_SAU_BO,
  THEME_GIA_VI_HUONG_VI,
  THEME_BANH_NGOT_TRANG_MIENG,
  THEME_DO_UONG_TRA_SUA,
  THEME_DON_DEP_VIEC_NHA,
  THEME_PHU_KIEN_THOI_TRANG,
  THEME_PHONG_NGU_GIAC_NGU,
  THEME_PHONG_TAM_VE_SINH,
  THEME_CAM_GIAC_CO_THE,
  THEME_CAM_XUC_THAI_DO,
  THEME_MOI_QUAN_HE_XA_HOI,
  THEME_GIAO_TIEP_THU_TIN,
  THEME_HINH_HOC_HOA_TIET,
  THEME_CHAT_LIEU_VAT_LIEU,
  THEME_AM_THANH_NHAC_CU,
  THEME_ANH_SANG_THI_GIAC,
  THEME_VAN_DONG_CO_THE,
  THEME_DICH_VU_TIEN_ICH,
  THEME_SAN_BAY_NHA_GA,
  THEME_KHACH_SAN_LUU_TRU,
  THEME_AM_THUC_DUONG_PHO,
  THEME_GIAI_DOAN_CUOC_DOI,
  THEME_LE_HOI_PHONG_TUC,
  THEME_AN_TOAN_LUAT_LE,
  THEME_THIET_BI_GIA_DUNG,
];

export const BASIC_VOCABULARY_THEMES = ALL_BASIC_VOCABULARY_THEMES;

// 4. Consolidated Vocabularies List (All 1,298 words preserved)
export const ALL_BASIC_VOCABULARIES: BasicVocabularyItem[] = [
  ...VOCABS_CHAO_HOI_GIAO_TIEP,
  ...VOCABS_GIOI_THIEU_DAI_TU,
  ...VOCABS_SO_DEM_THU_TU,
  ...VOCABS_MAU_SAC_HINH_KHOI,
  ...VOCABS_GIA_DINH_NGUOI_THAN,
  ...VOCABS_NHA_CUA_DO_DUNG,
  ...VOCABS_DONG_TU_HANG_NGAY,
  ...VOCABS_AN_UONG_THUC_PHAM,
  ...VOCABS_CAM_XUC_TINH_TU,
  ...VOCABS_THOI_GIAN_LICH,
  ...VOCABS_DONG_VAT_QUEN_THUOC,
  ...VOCABS_BO_PHAN_CO_THE,
  ...VOCABS_TRANG_PHUC_CO_BAN,
  ...VOCABS_DIA_DIEM_CHI_DUONG,
  ...VOCABS_THOI_TIET_THIEN_NHIEN,
  ...VOCABS_NGHE_NGHIEP_VIEC_LAM,
  ...VOCABS_PHUONG_TIEN_GIAO_THONG,
  ...VOCABS_TRUONG_HOC_DUNG_CU,
  ...VOCABS_SO_THICH_THE_THAO,
  ...VOCABS_MUA_SAM_TIEN_TE,
  ...VOCABS_CAY_COI_HOA_QUA,
  ...VOCABS_SUC_KHOE_Y_TE,
  ...VOCABS_DUNG_CU_NHA_BEP,
  ...VOCABS_VAN_PHONG_CONG_NGHE,
  ...VOCABS_THANH_PHO_CONG_TRINH,
  ...VOCABS_TINH_CACH_PHAM_CHAT,
  ...VOCABS_GIOI_TU_VI_TRI,
  ...VOCABS_GIAC_QUAN_CAM_NHAN,
  ...VOCABS_KY_NGHI_DU_LICH,
  ...VOCABS_GIAI_TRI_NGHE_THUAT,
  ...VOCABS_DO_LUONG_KICH_CO,
  ...VOCABS_DUNG_CU_SUA_CHUA,
  ...VOCABS_THIEN_TAI_THOI_TIET_XAU,
  ...VOCABS_DIA_HINH_CANH_QUAN,
  ...VOCABS_SINH_VAT_BIEN_DAI_DUONG,
  ...VOCABS_CON_TRUNG_SAU_BO,
  ...VOCABS_GIA_VI_HUONG_VI,
  ...VOCABS_BANH_NGOT_TRANG_MIENG,
  ...VOCABS_DO_UONG_TRA_SUA,
  ...VOCABS_DON_DEP_VIEC_NHA,
  ...VOCABS_PHU_KIEN_THOI_TRANG,
  ...VOCABS_PHONG_NGU_GIAC_NGU,
  ...VOCABS_PHONG_TAM_VE_SINH,
  ...VOCABS_CAM_GIAC_CO_THE,
  ...VOCABS_CAM_XUC_THAI_DO,
  ...VOCABS_MOI_QUAN_HE_XA_HOI,
  ...VOCABS_GIAO_TIEP_THU_TIN,
  ...VOCABS_HINH_HOC_HOA_TIET,
  ...VOCABS_CHAT_LIEU_VAT_LIEU,
  ...VOCABS_AM_THANH_NHAC_CU,
  ...VOCABS_ANH_SANG_THI_GIAC,
  ...VOCABS_VAN_DONG_CO_THE,
  ...VOCABS_DICH_VU_TIEN_ICH,
  ...VOCABS_SAN_BAY_NHA_GA,
  ...VOCABS_KHACH_SAN_LUU_TRU,
  ...VOCABS_AM_THUC_DUONG_PHO,
  ...VOCABS_GIAI_DOAN_CUOC_DOI,
  ...VOCABS_LE_HOI_PHONG_TUC,
  ...VOCABS_AN_TOAN_LUAT_LE,
  ...VOCABS_THIET_BI_GIA_DUNG,
];

export const BASIC_VOCABULARIES = ALL_BASIC_VOCABULARIES;

// 5. O(1) Lookup Map by Theme ID
export const VOCABULARY_TOPICS_MAP: Record<string, VocabularyTopicPackage> = {
  "t_basic_greetings": CHUDE_CHAO_HOI_GIAO_TIEP,
  "t_basic_introductions": CHUDE_GIOI_THIEU_DAI_TU,
  "t_basic_numbers": CHUDE_SO_DEM_THU_TU,
  "t_basic_colors_shapes": CHUDE_MAU_SAC_HINH_KHOI,
  "t_basic_family": CHUDE_GIA_DINH_NGUOI_THAN,
  "t_basic_home_objects": CHUDE_NHA_CUA_DO_DUNG,
  "t_basic_daily_verbs": CHUDE_DONG_TU_HANG_NGAY,
  "t_basic_food_drinks": CHUDE_AN_UONG_THUC_PHAM,
  "t_basic_emotions_adjectives": CHUDE_CAM_XUC_TINH_TU,
  "t_basic_time_calendar": CHUDE_THOI_GIAN_LICH,
  "t_basic_animals": CHUDE_DONG_VAT_QUEN_THUOC,
  "t_basic_body_parts": CHUDE_BO_PHAN_CO_THE,
  "t_basic_clothes": CHUDE_TRANG_PHUC_CO_BAN,
  "t_basic_places_directions": CHUDE_DIA_DIEM_CHI_DUONG,
  "t_basic_weather_nature": CHUDE_THOI_TIET_THIEN_NHIEN,
  "t_basic_jobs_occupations": CHUDE_NGHE_NGHIEP_VIEC_LAM,
  "t_basic_transportation": CHUDE_PHUONG_TIEN_GIAO_THONG,
  "t_basic_school_stationery": CHUDE_TRUONG_HOC_DUNG_CU,
  "t_basic_hobbies_sports": CHUDE_SO_THICH_THE_THAO,
  "t_basic_shopping_money": CHUDE_MUA_SAM_TIEN_TE,
  "t_basic_plants_fruits": CHUDE_CAY_COI_HOA_QUA,
  "t_basic_health_medical": CHUDE_SUC_KHOE_Y_TE,
  "t_basic_kitchen_utensils": CHUDE_DUNG_CU_NHA_BEP,
  "t_basic_office_tech": CHUDE_VAN_PHONG_CONG_NGHE,
  "t_basic_city_buildings": CHUDE_THANH_PHO_CONG_TRINH,
  "t_basic_personality_traits": CHUDE_TINH_CACH_PHAM_CHAT,
  "t_basic_prepositions_positions": CHUDE_GIOI_TU_VI_TRI,
  "t_basic_senses_perceptions": CHUDE_GIAC_QUAN_CAM_NHAN,
  "t_basic_vacation_tourism": CHUDE_KY_NGHI_DU_LICH,
  "t_basic_entertainment_arts": CHUDE_GIAI_TRI_NGHE_THUAT,
  "t_basic_measurements_sizes": CHUDE_DO_LUONG_KICH_CO,
  "t_basic_tools_repair": CHUDE_DUNG_CU_SUA_CHUA,
  "t_basic_severe_weather": CHUDE_THIEN_TAI_THOI_TIET_XAU,
  "t_basic_landforms_landscapes": CHUDE_DIA_HINH_CANH_QUAN,
  "t_basic_marine_life": CHUDE_SINH_VAT_BIEN_DAI_DUONG,
  "t_basic_insects_bugs": CHUDE_CON_TRUNG_SAU_BO,
  "t_basic_spices_herbs": CHUDE_GIA_VI_HUONG_VI,
  "t_basic_bakery_desserts": CHUDE_BANH_NGOT_TRANG_MIENG,
  "t_basic_drinks_beverages": CHUDE_DO_UONG_TRA_SUA,
  "t_basic_cleaning_chores": CHUDE_DON_DEP_VIEC_NHA,
  "t_basic_fashion_accessories": CHUDE_PHU_KIEN_THOI_TRANG,
  "t_basic_bedroom_sleep": CHUDE_PHONG_NGU_GIAC_NGU,
  "t_basic_bathroom_toiletries": CHUDE_PHONG_TAM_VE_SINH,
  "t_basic_bodily_sensations": CHUDE_CAM_GIAC_CO_THE,
  "t_basic_feelings_attitudes": CHUDE_CAM_XUC_THAI_DO,
  "t_basic_relationships_social": CHUDE_MOI_QUAN_HE_XA_HOI,
  "t_basic_conversation_communication": CHUDE_GIAO_TIEP_THU_TIN,
  "t_basic_geometry_patterns": CHUDE_HINH_HOC_HOA_TIET,
  "t_basic_materials_substances": CHUDE_CHAT_LIEU_VAT_LIEU,
  "t_basic_sounds_instruments": CHUDE_AM_THANH_NHAC_CU,
  "t_basic_light_visual_effects": CHUDE_ANH_SANG_THI_GIAC,
  "t_basic_body_movements": CHUDE_VAN_DONG_CO_THE,
  "t_basic_convenience_services": CHUDE_DICH_VU_TIEN_ICH,
  "t_basic_airport_station_travel": CHUDE_SAN_BAY_NHA_GA,
  "t_basic_hotel_accommodation": CHUDE_KHACH_SAN_LUU_TRU,
  "t_basic_street_food_snacks": CHUDE_AM_THUC_DUONG_PHO,
  "t_basic_life_stages_age": CHUDE_GIAI_DOAN_CUOC_DOI,
  "t_basic_holidays_customs": CHUDE_LE_HOI_PHONG_TUC,
  "t_basic_safety_warnings_rules": CHUDE_AN_TOAN_LUAT_LE,
  "t_basic_appliances_gadgets": CHUDE_THIET_BI_GIA_DUNG,
};

// 6. Fast Helper Functions
export function getTopicByThemeId(themeId: string): VocabularyTopicPackage | undefined {
  return VOCABULARY_TOPICS_MAP[themeId];
}

export function getBasicVocabulariesByTheme(themeId: string): BasicVocabularyItem[] {
  const pkg = VOCABULARY_TOPICS_MAP[themeId];
  return pkg ? pkg.vocabs : [];
}

export function searchBasicVocabularies(query: string): BasicVocabularyItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return ALL_BASIC_VOCABULARIES;
  return ALL_BASIC_VOCABULARIES.filter(
    (v) =>
      v.word.toLowerCase().includes(q) ||
      v.definitionVn.toLowerCase().includes(q) ||
      v.definition.toLowerCase().includes(q) ||
      v.themeNameVn.toLowerCase().includes(q)
  );
}

const BASIC_VOCAB_MAP = new Map<string, BasicVocabularyItem>();
export function getBasicVocabularyById(id: string): BasicVocabularyItem | undefined {
  if (BASIC_VOCAB_MAP.size === 0) {
    for (const v of ALL_BASIC_VOCABULARIES) {
      BASIC_VOCAB_MAP.set(v.id, v);
    }
  }
  return BASIC_VOCAB_MAP.get(id);
}
