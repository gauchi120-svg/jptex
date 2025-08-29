import gradio as gr
from transformers import pipeline

# 載入一個輕量級的對話模型
# 這是一個英文模型，但足以當作範例
chatbot_pipeline = pipeline("conversational", model="microsoft/DialoGPT-small")

# 定義聊天機器人的回應邏輯
def chat_function(message, history):
    # 使用 pipeline 來生成回應
    # history 參數會自動由 gr.ChatInterface 管理
    return chatbot_pipeline(message)['generated_responses'][-1]

# 使用 Gradio 的 ChatInterface 建立一個完整的聊天介面
# 這會自動處理 UI、輸入歷史、狀態管理等
demo = gr.ChatInterface(
    fn=chat_function,
    title="AI 聊天機器人",
    description="這是一個由 Gradio 和 Hugging Face 驅動的簡單聊天機器人。輸入訊息開始對話吧！",
    theme="soft"
)

# 啟動應用程式
if __name__ == "__main__":
    demo.launch()

