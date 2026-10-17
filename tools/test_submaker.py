import asyncio
import edge_tts

TEXT = """Tại sao người ta làm 6 tháng đã lên Tổ trưởng, còn mình cày 3 năm vẫn dậm chân tại chỗ? Bí mật nằm ở chiếc máy này: Điện thoại Zin Zone – 21 ngày tốc hành Hán ngữ, thăng chức công xưởng!

Máy được kích hoạt sẵn siêu ứng dụng Zin Zone bản quyền 1 triệu 5 kèm máy! Không cần học ngữ pháp rườm rà. App giúp bạn đánh thức 70% gốc Hán-Việt có sẵn trong máu! 100% khẩu lệnh xưởng thực chiến: nói chuyện với sếp, báo máy hỏng, xin tăng ca, duyệt đơn hàng... Vừa tu tiên lên cấp, vừa thuộc làu làu chỉ sau 21 ngày!

Đây là dòng máy lướt tuyển chọn, chuẩn zin 100% từng con ốc, chưa hề qua sửa chữa! Cửa hàng trợ giá trực tiếp cho anh em công nhân: Mua lẻ 1 máy cũng được tính đúng bằng giá sỉ tại kho! Máy mượt, pin cực trâu, cày ca đêm vô tư!

Đặc biệt, cơ hội kiếm thêm thu nhập cho anh em: Chỉ cần giới thiệu 1 bạn bè hoặc công nhân cùng tổ lấy máy, nhận ngay 200.000 đồng tiền mặt trao tay! Chia sẻ 5 người là có ngay 1 triệu bỏ túi cực kỳ dễ dàng!

Không cần tốn tiền triệu đi trung tâm, chỉ cần cầm chiếc máy này trong tay 21 ngày là tự tin giao tiếp, đổi đời thăng chức! Số lượng máy zin giá sỉ đợt này có hạn, bấm ngay vào nút nhắn tin hoặc ghé tiệm để rinh máy ngay hôm nay!"""

async def test_submaker():
    communicate = edge_tts.Communicate(TEXT, "vi-VN-NamMinhNeural", rate="+5%")
    submaker = edge_tts.SubMaker()
    with open("audio/promo/test_sub.mp3", "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                submaker.feed(chunk)
    srt_content = submaker.get_srt()
    print("SRT generated! Sample:")
    print(srt_content[:500])
    with open("audio/promo/test_sub.srt", "w", encoding="utf-8") as f:
        f.write(srt_content)

asyncio.run(test_submaker())
