---
title: "LLM API 价格目录：大模型 API 价格、额度、申请入口综合对比"
description: "整理 Claude API、OpenRouter API、DeepSeek API、Qwen API、Doubao API、GLM API、Gemini API 等大模型 API 的价格、额度、免费额度、官网入口和 API key 申请方向。"
keywords: "LLM API 价格,大模型 API 价格,AI API 价格,Claude API 价格,DeepSeek API 价格,Qwen API 价格,Doubao API 价格,GLM API 价格,Gemini API 价格,API key 申请,免费额度,额度重置,官网入口"
date: "2026-06-19"
tags: "LLM API,API 价格,大模型 API,价格目录,API key 申请"
---

# LLM API 价格目录：大模型 API 价格、额度、申请入口综合对比

> 可视化页面：[https://tokenplan.pw/llm-api-pricing/](https://tokenplan.pw/llm-api-pricing/)

这个专题不是单纯列价格，而是把常见大模型 API 的价格、额度、免费额度、申请入口、官网入口、模型覆盖、Claude Code / Cursor 接入可能性放在一起看。

数据来源：TokenPlan 详情

[https://tokenplan.vip](https://tokenplan.vip)

## 快速对比

| 平台 | 类型 | 主要模型 | 计费方式 | 重点关注 | 适合人群 |
|---|---|---|---|---|---|
| Claude API | 官方 API | Opus / Sonnet / Haiku | 按量计费 | 推理、代码、长文本、Claude Code 生态 | 海外 API、Agent、代码工具 |
| OpenRouter API | API 聚合 | 340+ 模型 | 按量计费 | 多模型统一入口、OpenAI 兼容 | 想统一调用多家模型的开发者 |
| DeepSeek API | 官方 API | V3 / R1 | 按量计费 | 推理成本、国产模型、低成本调用 | 成本敏感、中文场景 |
| Qwen API | 官方 API | Qwen 系列 | 按量计费 | 阿里云百炼、国产生态、企业接入 | 企业应用、阿里云用户 |
| Doubao API | 官方 API | Doubao 系列 | 按量计费 | 火山方舟、多模态、国内访问 | 国内产品、火山生态 |
| GLM API | 官方 API | GLM 系列 | 按量计费 | 智谱生态、多模态、代码能力 | 国产模型、企业应用 |
| Gemini API | 官方 API | Pro / Flash | 按量计费 | Google 生态、长上下文、多模态 | Google 生态、多模态应用 |

## 选择维度

| 维度 | 需要看什么 |
|---|---|
| 价格 | 输入、输出、缓存、批处理、推理模型是否分开计费 |
| 额度 | 免费额度、试用额度、月度额度、是否有额度重置 |
| 官网入口 | API 控制台、Billing、模型文档、Key 管理入口是否清楚 |
| 申请门槛 | 是否需要企业认证、手机号、信用卡、云账号或地区限制 |
| 接入方式 | 是否 OpenAI 兼容，是否能接入 Claude Code、Cursor、Codex、Agent 框架 |
| 稳定性 | 国内访问、限速、并发、错误率、模型下线频率 |

## 推荐场景

### 低成本中文应用

优先比较 DeepSeek、Qwen、Doubao、GLM。重点看输出价格、并发限制、免费额度和国内控制台体验。

### 多模型统一入口

优先看 OpenRouter。适合需要 Claude、Gemini、DeepSeek、Qwen 等模型统一通过一个 API key 调用的项目。

### Agent 和代码生成

优先比较 Claude API、DeepSeek、Qwen、GLM、Gemini。重点看长上下文、工具调用、代码能力、Claude Code 或 Cursor 接入方式。

### 多模态应用

优先看 Gemini、Doubao、GLM、Qwen。重点看图片、语音、视频、OCR、长上下文和延迟。

## 入口索引

- [Claude Token Plan](https://tokenplan.vip/claude-token-plan/)
- [OpenRouter Token API](https://tokenplan.vip/openrouter-token-api/)
- [DeepSeek Token API](https://tokenplan.vip/deepseek-token-api/)
- [Qwen Token API](https://tokenplan.vip/qianwen-token-api/)
- [Doubao Token API](https://tokenplan.vip/doubao-token-api/)
- [Zhipu Token Plan](https://tokenplan.vip/zhipu-token-plan/)
- [Gemini Token Plan](https://tokenplan.vip/gemini-token-plan/)

## 说明

价格、额度、模型名称和套餐权益可能变化。这个专题用于做选型索引，最终价格和可用额度请以官方页面和 [TokenPlan](https://tokenplan.vip/) 实时数据为准。

## 常见问题

### LLM API 价格目录 主要解决什么问题？

LLM API 价格目录 主要用于快速比较 大模型 API 价格对比，覆盖 OpenAI、Claude、Gemini、DeepSeek、Qwen、Doubao、GLM 等 API 价格，帮助用户减少反复打开多个官网价格页的时间。

### 为什么需要单独整理 大模型 API 价格对比？

不同平台的计费单位、免费额度、模型名称、上下文长度和套餐权益差异很大，单独整理后更方便做横向比较和初步筛选。

### 这个目录适合开发者还是普通用户？

两类用户都适合。开发者可以用来估算 API 成本、选择模型和申请 API Key；普通用户可以用来比较订阅价格、套餐权益和免费额度。

### 使用这些价格信息时要注意什么？

适合开发者做模型选型、成本估算和 API Key 申请前对比。价格、额度和权益可能随时变化，正式购买或接入前应以官方页面和 TokenPlan 实时页面为准。

### Token Plan 和 API 价格应该怎么一起看？

Token Plan 适合看套餐权益、额度和订阅成本；API 价格适合看模型调用成本、输入输出 tokens 单价和生产环境费用。做 AI 应用时建议同时比较两者。

