import os
import re
from datetime import datetime

def update_weights(posts_dir):
    # 檢查目標目錄是否存在
    if not os.path.exists(posts_dir):
        print(f"目錄 {posts_dir} 不存在，請確認路徑正確！")
        return

    # 搜集所有 Markdown 文件
    post_files = []
    for root, _, files in os.walk(posts_dir):  # 遞歸搜尋子目錄
        for file in files:
            if file.endswith('.md'):
                post_files.append(os.path.join(root, file))

    if not post_files:
        print(f"在 {posts_dir} 中未找到任何 Markdown 文件。")
        return

    posts = []

    # 讀取每篇文章的日期
    for post_file in post_files:
        with open(post_file, 'r', encoding='utf-8') as file:
            content = file.read()
            # 匹配 date 屬性
            date_match = re.search(r'^date:\s+([^\n]+)', content, re.MULTILINE)
            if date_match:
                date_str = date_match.group(1).strip()
                # 修正日期格式
                date_str = date_str.replace("+0000", "+00:00")
                try:
                    date_obj = datetime.fromisoformat(date_str)  # 解析日期
                    posts.append((post_file, date_obj, content))
                except ValueError:
                    print(f"文件 {post_file} 中的日期格式無效：{date_str}")

    if not posts:
        print(f"在 {posts_dir} 中未找到有效的日期標籤。")
        return

    # 按日期排序 (從新到舊)
    posts.sort(key=lambda x: x[1], reverse=True)

    # 更新 weight
    for i, (post_file, _, content) in enumerate(posts, start=1):
        updated_content = re.sub(
            r'^weight:\s*\d+',  # 匹配 weight 屬性
            f'weight: {i}',    # 更新 weight
            content,
            flags=re.MULTILINE
        )
        # 如果 weight 不存在，新增它
        if not re.search(r'^weight:\s*\d+', content, re.MULTILINE):
            updated_content = re.sub(
                r'^date:\s+[^\n]+',  # 在 date 後面新增 weight
                lambda match: f"{match.group(0)}\nweight: {i}",
                updated_content,
                flags=re.MULTILINE
            )

        # 將更新的內容寫回文件
        with open(post_file, 'w', encoding='utf-8') as file:
            file.write(updated_content)

    print(f"成功更新 {len(posts)} 篇文章的 weight 值！")

# 指定文章所在目錄
if __name__ == "__main__":
    update_weights('content/post')
