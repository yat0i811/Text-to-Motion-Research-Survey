# Text-to-Motion Research Survey

**公開 URL:** https://yat0i811.github.io/Text-to-Motion-Research-Survey/

テキストから人体モーションを生成する研究（2016〜2026年6月）を、**論文・データセット・ベンチマーク性能**の3軸で整理した Web アプリです。

- 論文 **188本**（手法・データセット・サーベイ）
- データセット **24種**
- HumanML3D ベンチマーク **19モデル**の性能比較

> 最終更新: **2026年7月1日** ／ 対象期間: 2016–2026

---

## 起動方法

Python 3 が必要です。

```powershell
python server.py
```

ブラウザで <http://localhost:8528> にアクセス。停止は `Ctrl+C`。

---

## 画面構成

ヘッダーの4タブで切り替えます。

| タブ | 内容 |
|------|------|
| **概要** | 年別研究数・会議別・アプローチ別のグラフ、研究3フェーズの解説 |
| **論文** | 188本を検索／年・アプローチ・会議で絞り込み。各行から arXiv・Project へ |
| **データセット** | 24種をカード表示（規模・FPS・テキスト数・身体範囲・特徴）＋規模比較チャート |
| **性能比較** | HumanML3D の FID・R-Precision・MM-Dist・Diversity を指標別に可視化、改善推移グラフ |

---

## 収録データの概要

| カテゴリ | 件数 |
|----------|------|
| 手法・モデル論文 | 約160本 |
| 関連研究（隣接タスク） | 19本 |
| データセット論文 | 4本（一覧内） |
| サーベイ論文 | 5本 |
| **論文 合計** | **188本** |
| 対象年 | 2017〜2026（2016年以前のKIT含む・グラフは「〜2021」に集約） |
| データセット | 24種 |
| ベンチマーク評価モデル | 19モデル |
| 調査期間 | 2016〜2026年6月 |

アプローチ区分: Diffusion / Autoregressive・VQ / LLM / Flow Matching / Masked Modeling / Retrieval / Transformer / Control・Editing / Scene・Interaction / Dataset / Survey

> 発表先は各論文の project ページ・公式 proceedings で検証済み。arXiv 段階のものは `arXiv` 表記。

---

## ファイル構成

役割ごとに分割し、編集箇所を見つけやすくしています。

```
Text-to-Motion-Research/
├── index.html        # ページ構造（HTML）。CSS/JS を読み込むだけ
├── css/
│   └── styles.css    # 配色・レイアウト・コンポーネントのスタイル
├── js/
│   ├── data.js       # ★データ: PAPERS / DATASETS / PERF_DATA（追加・編集はここ）
│   └── app.js        # ロジック: グラフ描画・検索/絞り込み・タブ・初期化
├── server.py         # Python 組み込み HTTP サーバー（ポート 8528）
└── README.md         # 本ファイル
```

**よくある編集箇所**

| やりたいこと | 編集ファイル | 対象 |
|--------------|--------------|------|
| 論文を追加・修正 | `js/data.js` | `PAPERS` 配列 |
| データセットを追加・修正 | `js/data.js` | `DATASETS` 配列 |
| 性能比較の数値を追加・修正 | `js/data.js` | `PERF_DATA` 配列 |
| 見た目（色・余白・フォント）を調整 | `css/styles.css` | 各セレクタ |
| グラフ・絞り込み等の挙動を変更 | `js/app.js` | 各関数 |
| 文章・更新日時・出典を変更 | `index.html` | 本文・フッター・meta |

> 読み込み順は `data.js` → `app.js`（app.js がデータを参照するため）。Chart.js のみ CDN から読み込みます。`server.py` はディレクトリ配下を配信するため `css/`・`js/` もそのまま提供されます。

---

## 引用文献

> 形式: **モデル/略称** — 論文タイトル. *発表先 年*. arXiv:ID
> （会議名の年は採択年。年見出しは arXiv 初出年。`—` は arXiv 未登録）

### 初期研究（2017–2021・グラフでは「〜2021」に集約）

- **Text2Action** — Generative Adversarial Synthesis from Language to Action. *ICRA 2018*. [arXiv:1710.05298](https://arxiv.org/abs/1710.05298)
- **Motion↔Lang RNN (Plappert ら)** — Learning a Bidirectional Mapping between Human Whole-body Motion and Natural Language using Deep RNNs. *RAS 2018*. [arXiv:1705.06400](https://arxiv.org/abs/1705.06400)
- **JL2P** — Language2Pose: Natural Language Grounded Pose Forecasting. *3DV 2019*. [arXiv:1907.01108](https://arxiv.org/abs/1907.01108)
- **Ghosh et al.** — Synthesis of Compositional Animations from Textual Descriptions. *ICCV 2021*. [arXiv:2103.14675](https://arxiv.org/abs/2103.14675)

> 同時期の隣接研究（Action2Motion / Text2Gestures / AI Choreographer(FACT) / DanceRevolution / ChoreoMaster）は「関連研究」区分に収録。

### サーベイ

- **Human Motion Generation: A Survey** — *TPAMI 2023*. [arXiv:2307.10894](https://arxiv.org/abs/2307.10894)
- **Text-driven Motion Generation: Overview, Challenges and Directions** — *arXiv 2025*. [arXiv:2505.09379](https://arxiv.org/abs/2505.09379)
- **Multimodal Generative AI with Autoregressive LLMs for Human Motion** — *arXiv 2025*. [arXiv:2506.03191](https://arxiv.org/abs/2506.03191)
- **3D Human Interaction Generation: A Survey** — *arXiv 2025*. [arXiv:2503.13120](https://arxiv.org/abs/2503.13120)
- **The Quest for Generalizable Motion Generation (ViMoGen)** — *arXiv 2025*. [arXiv:2510.26794](https://arxiv.org/abs/2510.26794)

### 手法・モデル（年別）

#### 2021–2022

- **ACTOR** — Action-Conditioned 3D Human Motion Synthesis with Transformer VAE. *ICCV 2021*. [arXiv:2104.05670](https://arxiv.org/abs/2104.05670)
- **TEMOS** — Generating Diverse Human Motions from Textual Descriptions. *ECCV 2022*. [arXiv:2204.14109](https://arxiv.org/abs/2204.14109)
- **TM2T** — Stochastic and Tokenized Modeling for Text↔Motion. *ECCV 2022*. [arXiv:2207.01696](https://arxiv.org/abs/2207.01696)
- **MotionCLIP** — Exposing Human Motion Generation to CLIP Space. *ECCV 2022*. [arXiv:2203.08063](https://arxiv.org/abs/2203.08063)
- **TEACH** — Temporal Action Composition for 3D Humans. *3DV 2022*. [arXiv:2209.04066](https://arxiv.org/abs/2209.04066)
- **MDM** — Human Motion Diffusion Model. *ICLR 2023*. [arXiv:2209.14916](https://arxiv.org/abs/2209.14916)
- **MotionDiffuse** — Text-Driven Human Motion Generation with Diffusion Model. *TPAMI*. [arXiv:2208.15001](https://arxiv.org/abs/2208.15001)
- **FLAME** — Free-form Language-based Motion Synthesis & Editing. *AAAI 2023*. [arXiv:2209.00349](https://arxiv.org/abs/2209.00349)
- **HUMANISE** — Language-conditioned Human Motion Generation in 3D Scenes. *NeurIPS 2022*. [arXiv:2210.09729](https://arxiv.org/abs/2210.09729)

#### 2023

- **T2M-GPT** — Generating Human Motion with Discrete Representations. *CVPR 2023*. [arXiv:2301.06052](https://arxiv.org/abs/2301.06052)
- **MLD** — Executing your Commands via Motion Diffusion in Latent Space. *CVPR 2023*. [arXiv:2212.04048](https://arxiv.org/abs/2212.04048)
- **MoFusion** — A Framework for Denoising-Diffusion-based Motion Synthesis. *CVPR 2023*. [arXiv:2212.04495](https://arxiv.org/abs/2212.04495)
- **ReMoDiffuse** — Retrieval-Augmented Motion Diffusion Model. *ICCV 2023*. [arXiv:2304.01116](https://arxiv.org/abs/2304.01116)
- **Fg-T2M** — Fine-Grained Text-Driven Human Motion Generation. *ICCV 2023*. [arXiv:2309.06773](https://arxiv.org/abs/2309.06773)
- **AttT2M** — Multi-Perspective Attention for Text-Driven Motion. *ICCV 2023*. [arXiv:2309.00796](https://arxiv.org/abs/2309.00796)
- **PhysDiff** — Physics-Guided Human Motion Diffusion Model. *ICCV 2023*. [arXiv:2212.02500](https://arxiv.org/abs/2212.02500)
- **GMD** — Guided Motion Diffusion for Controllable Human Motion Synthesis. *ICCV 2023*. [arXiv:2305.12577](https://arxiv.org/abs/2305.12577)
- **MAA** — Make-An-Animation: Large-Scale Text-conditional 3D Human Motion Generation. *ICCV 2023*. [arXiv:2305.09662](https://arxiv.org/abs/2305.09662)
- **TMR** — Text-to-Motion Retrieval Using Contrastive 3D Human Motion Synthesis. *ICCV 2023*. [arXiv:2305.00976](https://arxiv.org/abs/2305.00976)
- **M2DM** — Priority-Centric Human Motion Generation in Discrete Latent Space. *ICCV 2023*. [arXiv:2308.14480](https://arxiv.org/abs/2308.14480)
- **MotionGPT** — Human Motion as a Foreign Language. *NeurIPS 2023*. [arXiv:2306.14795](https://arxiv.org/abs/2306.14795)
- **FineMoGen** — Fine-Grained Spatio-Temporal Motion Generation and Editing. *NeurIPS 2023*. [arXiv:2312.15004](https://arxiv.org/abs/2312.15004)
- **InterGen** — Diffusion-based Multi-human Motion Generation under Text. *IJCV 2023*. [arXiv:2304.05684](https://arxiv.org/abs/2304.05684)
- **PriorMDM** — Human Motion Diffusion as a Generative Prior. *ICLR 2024*. [arXiv:2303.01418](https://arxiv.org/abs/2303.01418)
- **Story-to-Motion** — Controllable Animation from Long Text. *arXiv 2023*. [arXiv:2311.07446](https://arxiv.org/abs/2311.07446)
- **MoConVQ** — Unified Physics-Based Motion Control via Scalable Discrete Representations. *SIGGRAPH 2024*. [arXiv:2310.10198](https://arxiv.org/abs/2310.10198)

#### 2024

- **OmniControl** — Control Any Joint at Any Time for Human Motion Generation. *ICLR 2024*. [arXiv:2310.08580](https://arxiv.org/abs/2310.08580)
- **MoMask** — Generative Masked Modeling of 3D Human Motions. *CVPR 2024*. [arXiv:2312.00063](https://arxiv.org/abs/2312.00063)
- **MMM** — Generative Masked Motion Model. *CVPR 2024*. [arXiv:2312.03596](https://arxiv.org/abs/2312.03596)
- **AvatarGPT** — All-in-One Framework for Motion Understanding, Planning, Generation. *CVPR 2024*. [arXiv:2311.16468](https://arxiv.org/abs/2311.16468)
- **FlowMDM** — Seamless Human Motion Composition with Blended Positional Encodings. *CVPR 2024*. [arXiv:2402.15509](https://arxiv.org/abs/2402.15509)
- **HumanTOMATO** — Text-aligned Whole-body Motion Generation. *ICML 2024*. [arXiv:2310.12978](https://arxiv.org/abs/2310.12978)
- **BAMM** — Bidirectional Autoregressive Motion Model. *ECCV 2024*. [arXiv:2403.19435](https://arxiv.org/abs/2403.19435)
- **EMDM** — Efficient Motion Diffusion Model. *ECCV 2024*. [arXiv:2312.02256](https://arxiv.org/abs/2312.02256)
- **ParCo** — Part-Coordinating Text-to-Motion Synthesis. *ECCV 2024*. [arXiv:2403.18512](https://arxiv.org/abs/2403.18512)
- **MotionLCM** — Real-time Controllable Motion Generation via Latent Consistency. *ECCV 2024*. [arXiv:2404.19759](https://arxiv.org/abs/2404.19759)
- **Motion Mamba** — Efficient and Long Sequence Motion Generation. *ECCV 2024*. [arXiv:2403.07487](https://arxiv.org/abs/2403.07487)
- **M2D2M** — Multi-Motion Generation from Text with Discrete Diffusion. *ECCV 2024*. [arXiv:2407.14502](https://arxiv.org/abs/2407.14502)
- **LMM** — Large Motion Model for Unified Multi-Modal Motion Generation. *ECCV 2024*. [arXiv:2404.01284](https://arxiv.org/abs/2404.01284)
- **TeSMo** — Generating Human Interaction Motions in Scenes with Text Control. *ECCV 2024*. [arXiv:2404.10685](https://arxiv.org/abs/2404.10685)
- **MoGenTS** — Motion Generation based on Spatial-Temporal Joint Modeling. *NeurIPS 2024*. [arXiv:2409.17686](https://arxiv.org/abs/2409.17686)
- **M³GPT** — Advanced Multimodal Motion Generation Model. *NeurIPS 2024*. [arXiv:2405.16273](https://arxiv.org/abs/2405.16273)
- **StableMoFusion** — Robust and Efficient Diffusion-based Motion Generation. *ACM MM 2024*. [arXiv:2405.05691](https://arxiv.org/abs/2405.05691)
- **MotionFix** — Text-Driven 3D Human Motion Editing. *SIGGRAPH Asia 2024*. [arXiv:2408.00712](https://arxiv.org/abs/2408.00712)
- **Motion-Agent** (旧 MotionLLM) — A Conversational Framework for Human Motion Generation with LLMs. *arXiv 2024*. [arXiv:2405.17013](https://arxiv.org/abs/2405.17013)
- **MotionChain** — Conversational Motion Controllers via Multimodal Prompts. *arXiv 2024*. [arXiv:2404.01700](https://arxiv.org/abs/2404.01700)
- **MotionGPT-2** — A General-Purpose Motion-Language Model. *arXiv 2024*. [arXiv:2410.21747](https://arxiv.org/abs/2410.21747)
- **T2M-X** — Expressive Text-to-Motion from Partially Annotated Data. *arXiv 2024*. [arXiv:2409.13251](https://arxiv.org/abs/2409.13251)
- **Infinite Motion** — Extended Motion Generation via Long Text Instructions. *arXiv 2024*. [arXiv:2407.08443](https://arxiv.org/abs/2407.08443)
- **MMDM** — Text-driven Human Motion Generation with Motion Masked Diffusion Model. *arXiv 2024*. [arXiv:2409.19686](https://arxiv.org/abs/2409.19686)
- **T2LM** — Long-Term 3D Human Motion Generation from Multiple Sentences. *CVPR-W 2024*. —
- **DART** — DartControl: Diffusion-based Autoregressive Motion Model for Real-Time Control. *ICLR 2025*. [arXiv:2410.05260](https://arxiv.org/abs/2410.05260)
- **MaskControl** (旧 ControlMM) — Spatio-Temporal Control for Masked Motion Synthesis. *ICCV 2025 (Oral)*. [arXiv:2410.10780](https://arxiv.org/abs/2410.10780)
- **ReinDiffuse** — Crafting Physically Plausible Motions with Reinforced Diffusion Model. *WACV 2025*. [arXiv:2410.07296](https://arxiv.org/abs/2410.07296)
- **MotionCraft** — Crafting Whole-Body Motion with Plug-and-Play Multimodal Controls. *AAAI 2025*. [arXiv:2407.21136](https://arxiv.org/abs/2407.21136)
- **MoLA** — Motion Generation and Editing with Latent Diffusion + Adversarial Training. *CVPR-W 2025*. [arXiv:2406.01867](https://arxiv.org/abs/2406.01867)
- **Being-M0** — Scaling Large Motion Models with Million-Level Human Motions. *ICML 2025*. [arXiv:2410.03311](https://arxiv.org/abs/2410.03311)
- **Motion-2-to-3** — Leveraging 2D Motion Data to Boost 3D Motion Generation. *ICCV 2025*. [arXiv:2412.13111](https://arxiv.org/abs/2412.13111)
- **KinMo** — Kinematic-aware Human Motion Understanding and Generation. *ICCV 2025*. [arXiv:2411.15472](https://arxiv.org/abs/2411.15472)
- **MARDM / RethinkDiff** — Rethinking Diffusion for Text-Driven Human Motion Generation. *CVPR 2025*. [arXiv:2411.16575](https://arxiv.org/abs/2411.16575)
- **Morph** — A Motion-free Physics Optimization Framework. *ICCV 2025*. [arXiv:2411.14951](https://arxiv.org/abs/2411.14951)

#### 2025

- **SALAD** — Skeleton-Aware Latent Diffusion for Motion Generation and Editing. *CVPR 2025*. [arXiv:2503.13836](https://arxiv.org/abs/2503.13836)
- **AToM** — Aligning Text-to-Motion Model at Event-Level with GPT-4Vision Reward. *CVPR 2025*. [arXiv:2411.18654](https://arxiv.org/abs/2411.18654)
- **PersonaBooth** — Personalized Text-to-Motion Generation. *CVPR 2025*. [arXiv:2503.07390](https://arxiv.org/abs/2503.07390)
- **EgoLM** — Multi-modal Language Model of Egocentric Motions. *CVPR 2025*. [arXiv:2409.18127](https://arxiv.org/abs/2409.18127)
- **MG-MotionLLM** — Unified Motion Comprehension and Generation across Multiple Granularities. *CVPR 2025*. [arXiv:2504.02478](https://arxiv.org/abs/2504.02478)
- **Shape My Moves** — Text-Driven Shape-Aware Synthesis of Human Motions. *CVPR 2025*. —
- **MixerMDM** — Learnable Composition of Human Motion Diffusion Models. *CVPR 2025*. [arXiv:2504.01019](https://arxiv.org/abs/2504.01019)
- **GENMO** — A Generalist Model for Human Motion. *ICCV 2025*. [arXiv:2505.01425](https://arxiv.org/abs/2505.01425)
- **CASIM** — Composite Aware Semantic Injection for Text-to-Motion. *ICCV 2025*. [arXiv:2502.02063](https://arxiv.org/abs/2502.02063)
- **MCM** — Multi-condition Motion Synthesis Framework. *ICCV 2025*. —
- **TAAT** — You Think, You ACT: Arbitrary Text to Motion Generation. *ICCV 2025*. —
- **Go to Zero** — Towards Zero-shot Motion Generation with Million-scale Data. *ICCV 2025*. [arXiv:2507.07095](https://arxiv.org/abs/2507.07095)
- **MotionStreamer** — Streaming Motion Generation via Diffusion-based Autoregressive Model. *ICCV 2025*. [arXiv:2503.15451](https://arxiv.org/abs/2503.15451)
- **LaMP** — Language-Motion Pretraining for Generation, Retrieval, and Captioning. *ICLR 2025*. [project](https://aigc3d.github.io/LaMP/)
- **Compositional Phase Diffusion** — for Text-driven Motion Generation. *NeurIPS 2025*. —
- **Fg-T2M++** — LLMs-Augmented Fine-Grained Text Driven Motion Generation. *IJCV 2025*. [arXiv:2502.05534](https://arxiv.org/abs/2502.05534)
- **OmniMotion** — Multimodal Motion Generation with Continuous Masked Autoregression. *arXiv 2025*. [arXiv:2510.14954](https://arxiv.org/abs/2510.14954)
- **ACMDM** — Absolute Coordinates Make Motion Generation Easy. *arXiv 2025*. [arXiv:2505.19377](https://arxiv.org/abs/2505.19377)
- **Motion-R1** — Chain-of-Thought Reasoning for Human Motion Generation. *arXiv 2025*. [arXiv:2506.10353](https://arxiv.org/abs/2506.10353)
- **ReMoMask** — Retrieval-Augmented Masked Motion Generation. *arXiv 2025*. [arXiv:2508.02605](https://arxiv.org/abs/2508.02605)
- **MoSa** — Motion Generation with Scalable Autoregressive Modeling. *arXiv 2025*. [arXiv:2511.01200](https://arxiv.org/abs/2511.01200)
- **GenM³** — Generative Pretrained Multi-path Motion Model. *arXiv 2025*. [arXiv:2503.14919](https://arxiv.org/abs/2503.14919)
- **MoCLIP** — Motion-Aware Fine-Tuning and Distillation of CLIP. *arXiv 2025*. [arXiv:2505.10810](https://arxiv.org/abs/2505.10810)
- **IKMo** — Image-Keyframed Motion Generation with Trajectory-Pose Diffusion. *arXiv 2025*. [arXiv:2505.21146](https://arxiv.org/abs/2505.21146)
- **Being-M0.5** — A Real-Time Controllable Vision-Language-Motion Model. *arXiv 2025*. [arXiv:2508.07863](https://arxiv.org/abs/2508.07863)
- **SMooGPT** — Stylized Motion Generation using Large Language Models. *arXiv 2025*. [arXiv:2509.04058](https://arxiv.org/abs/2509.04058)
- **FlowMotion** — Target-Predictive Conditional Flow Matching. *arXiv 2025*. [arXiv:2504.01338](https://arxiv.org/abs/2504.01338)
- **LUMA** — Low-Dimension Unified Motion Alignment for T2M Diffusion. *arXiv 2025*. [arXiv:2509.25304](https://arxiv.org/abs/2509.25304)
- **MAD-Motion** — Robust and Controllable T2M via Masked Autoregressive Diffusion. *arXiv 2025*. [arXiv:2505.11013](https://arxiv.org/abs/2505.11013)
- **Motion Anything** — Any to Motion Generation. *arXiv 2025*. [arXiv:2503.06955](https://arxiv.org/abs/2503.06955)
- **HMVLM** — Human Motion-Vision-Language Model via MoE LoRA. *arXiv 2025*. [arXiv:2511.01463](https://arxiv.org/abs/2511.01463)
- **FloodDiffusion** — Tailored Diffusion Forcing for Streaming Motion Generation. *arXiv 2025*. [arXiv:2512.03520](https://arxiv.org/abs/2512.03520)
- **FineXtrol** — Controllable Motion Generation via Fine-grained Text. *AAAI 2026*. —

#### 2026

- **CMDM** — Causal Motion Diffusion Models for Autoregressive Motion Generation. *CVPR 2026*. [arXiv:2602.22594](https://arxiv.org/abs/2602.22594)
- **ProjFlow** — Projection Sampling with Flow Matching for Zero-Shot Exact Spatial Motion Control. *CVPR 2026*. [arXiv:2602.22742](https://arxiv.org/abs/2602.22742)
- **Kimodo** — Scaling Controllable Human Motion Generation. *arXiv 2026*. [arXiv:2603.15546](https://arxiv.org/abs/2603.15546)
- **FlowCoMotion** — Text-to-Motion via Token–Latent Flow Modeling. *arXiv 2026*. [arXiv:2604.11083](https://arxiv.org/abs/2604.11083)
- **MotionHiFlow** — Text-to-Motion via Hierarchical Flow Matching. *arXiv 2026*. [arXiv:2604.23264](https://arxiv.org/abs/2604.23264)
- **TCA-T2M** — Temporal Consistency-Aware Text-to-Motion Generation. *arXiv 2026*. [arXiv:2602.18057](https://arxiv.org/abs/2602.18057)
- **CoAMD** — Marrying Text-to-Motion with Skeleton-Based Action Recognition. *arXiv 2026*. [arXiv:2604.17090](https://arxiv.org/abs/2604.17090)
- **MoLA-Align** — Exploring Motion-Language Alignment for Text-driven Motion Generation. *arXiv 2026*. [arXiv:2604.02973](https://arxiv.org/abs/2604.02973)
- **LG-Token** — Language-Guided Transformer Tokenizer for Human Motion Generation. *arXiv 2026*. [arXiv:2602.08337](https://arxiv.org/abs/2602.08337)
- **NS-T2M** — Next-Scale Autoregressive Models for Text-to-Motion Generation. *arXiv 2026*. [arXiv:2604.03799](https://arxiv.org/abs/2604.03799)
- **RADM** — Reconstruction-Anchored Diffusion Model for Text-to-Motion. *arXiv 2026*. [arXiv:2601.14788](https://arxiv.org/abs/2601.14788)
- **UniFlow** — Unified Number-Free Text-to-Motion Generation via Flow Matching. *arXiv 2026*. [arXiv:2603.27040](https://arxiv.org/abs/2603.27040)
- **AleatoMotion** — Embracing Aleatoric Uncertainty: Generating Diverse 3D Human Motion. *arXiv 2026*. [arXiv:2508.20604](https://arxiv.org/abs/2508.20604)
- **ParTY** — Part-Guidance for Expressive Text-to-Motion Synthesis. *arXiv 2026*. [arXiv:2603.09611](https://arxiv.org/abs/2603.09611)
- **Re2MoGen** — Open-Vocabulary Motion Generation via LLM Reasoning and Physics-Aware Refinement. *arXiv 2026*. [arXiv:2604.17807](https://arxiv.org/abs/2604.17807)
- **MotionRFT** — Unified Reinforcement Fine-Tuning for Text-to-Motion Generation. *arXiv 2026*. [arXiv:2603.27185](https://arxiv.org/abs/2603.27185)
- **CAMMG** — Not All Frames Are Equal: Complexity-Aware Masked Motion Generation. *arXiv 2026*. [arXiv:2603.29655](https://arxiv.org/abs/2603.29655)
- **UniMo** — Unified Motion Generation and Understanding with Chain of Thought. *arXiv 2026*. [arXiv:2601.12126](https://arxiv.org/abs/2601.12126)
- **LLaMo** — Scaling Pretrained Language Models for Unified Motion Understanding and Generation. *arXiv 2026*. [arXiv:2602.12370](https://arxiv.org/abs/2602.12370)
- **TriC-Motion** — Tri-Domain Causal Modeling Grounded Text-to-Motion Generation. *arXiv 2026*. [project](https://caoyiyang1105.github.io/TriC-Motion/)

### 追加収録（網羅補完 2026-06-29）

> スタイル制御・統一生成・編集・基礎手法など、関連研究を追加で網羅。

- **MotionGPT3** — Human Motion as a Second Modality. *arXiv 2025*. [arXiv:2506.24086](https://arxiv.org/abs/2506.24086)
- **AttrMoGen** — Generating Attribute-Aware Human Motions from Textual Prompt. *AAAI 2026*. [arXiv:2506.21912](https://arxiv.org/abs/2506.21912)
- **MOST** — Motion Diffusion Model for Rare Text via Temporal Clip Banzhaf Interaction. *arXiv 2025*. [arXiv:2507.06590](https://arxiv.org/abs/2507.06590)
- **X-MoGen** — Unified Motion Generation across Humans and Animals. *arXiv 2025*. [arXiv:2508.05162](https://arxiv.org/abs/2508.05162)
- **SASI** — Semantically Consistent Text-to-Motion with Unsupervised Styles. *SIGGRAPH 2025*. [project](https://fivezerojun.github.io/stylization.github.io/)
- **MoLingo** — Motion-Language Alignment for Text-to-Motion Generation. *CVPR 2026*. [arXiv:2512.13840](https://arxiv.org/abs/2512.13840)
- **IRG-MotionLLM** — Interleaving Motion Generation, Assessment and Refinement. *arXiv 2025*. [arXiv:2512.10730](https://arxiv.org/abs/2512.10730)
- **OmniMoGen** — Unifying Human Motion Generation via Interleaved Text-Motion Instructions. *arXiv 2025*. [arXiv:2512.19159](https://arxiv.org/abs/2512.19159)
- **HyperLoRA** — Stylized Text-to-Motion Generation via Hypernetwork-Driven Low-Rank Adaptation. *arXiv 2026*. [arXiv:2605.13333](https://arxiv.org/abs/2605.13333)
- **CoMoVi** — Co-Generation of 3D Human Motions and Realistic Videos. *arXiv 2026*. [arXiv:2601.10632](https://arxiv.org/abs/2601.10632)
- **AvatarCLIP** — Zero-Shot Text-Driven Generation and Animation of 3D Avatars. *SIGGRAPH 2022*. [arXiv:2205.08535](https://arxiv.org/abs/2205.08535)
- **SinMDM** — Single Motion Diffusion. *ICLR 2024*. [arXiv:2302.05905](https://arxiv.org/abs/2302.05905)
- **AMD** — Autoregressive Motion Diffusion. *AAAI 2024*. [arXiv:2305.09381](https://arxiv.org/abs/2305.09381)
- **GraphMotion** — Act As You Wish: Fine-Grained Control with Hierarchical Semantic Graphs. *NeurIPS 2023*. [arXiv:2311.01015](https://arxiv.org/abs/2311.01015)
- **MotionGPT(Z)** — Finetuned LLMs Are General-Purpose Motion Generators. *AAAI 2024*. [arXiv:2306.10900](https://arxiv.org/abs/2306.10900)
- **TLControl** — Trajectory and Language Control for Human Motion Synthesis. *ECCV 2024*. [arXiv:2311.17135](https://arxiv.org/abs/2311.17135)
- **B2A-HDM** — Towards Detailed Text-to-Motion Synthesis via Basic-to-Advanced Hierarchical Diffusion Model. *AAAI 2024*. [arXiv:2312.10960](https://arxiv.org/abs/2312.10960)
- **OMG** — Towards Open-vocabulary Motion Generation via Mixture of Controllers. *CVPR 2024*. [arXiv:2312.08985](https://arxiv.org/abs/2312.08985)
- **GUESS** — GradUally Enriching SyntheSis for Text-Driven Human Motion Generation. *TVCG 2024*. [arXiv:2401.02142](https://arxiv.org/abs/2401.02142)
- **STMC** — Multi-Track Timeline Control for Text-Driven 3D Human Motion Generation. *CVPR-W 2024*. [arXiv:2401.08559](https://arxiv.org/abs/2401.08559)
- **MotionMix** — Weakly-Supervised Diffusion for Controllable Motion Generation. *AAAI 2024*. [arXiv:2401.11115](https://arxiv.org/abs/2401.11115)
- **CoMo** — Controllable Motion Generation through Language Guided Pose Code Editing. *ECCV 2024*. [arXiv:2403.13900](https://arxiv.org/abs/2403.13900)
- **LGTM** — Local-to-Global Text-Driven Human Motion Diffusion Model. *SIGGRAPH 2024*. [arXiv:2405.03485](https://arxiv.org/abs/2405.03485)
- **MotionLLM** — Understanding Human Behaviors from Human Motions and Videos. *arXiv 2024*. [arXiv:2405.20340](https://arxiv.org/abs/2405.20340)
- **MotionCLR** — Motion Generation and Training-free Editing via Understanding Attention Mechanisms. *arXiv 2024*. [arXiv:2410.18977](https://arxiv.org/abs/2410.18977)
- **HMIT (LLaMo)** — Human Motion Instruction Tuning. *CVPR 2025*. [arXiv:2411.16805](https://arxiv.org/abs/2411.16805)
- **VersatileMotion** — A Unified Framework for Motion Synthesis and Comprehension. *arXiv 2024*. [arXiv:2411.17335](https://arxiv.org/abs/2411.17335)
- **ScaMo** — Exploring the Scaling Law in Autoregressive Motion Generation Model. *arXiv 2024*. [arXiv:2412.14559](https://arxiv.org/abs/2412.14559)
- **MotionLab** — Unified Human Motion Generation and Editing via the Motion-Condition-Motion Paradigm. *ICCV 2025*. [arXiv:2502.02358](https://arxiv.org/abs/2502.02358)
- **MotionReFit** — Dynamic Motion Blending for Versatile Motion Editing. *CVPR 2025*. [arXiv:2503.20724](https://arxiv.org/abs/2503.20724)
- **LAMD** — Local Action-Guided Motion Diffusion Model for Text-to-Motion Generation. *ECCV 2024*. [arXiv:2407.10528](https://arxiv.org/abs/2407.10528)
- **FTMoMamba** — Motion Generation with Frequency and Text State Space Models. *arXiv 2024*. [arXiv:2411.17532](https://arxiv.org/abs/2411.17532)
- **BiPO** — Bidirectional Partial Occlusion Network for Text-to-Motion Synthesis. *arXiv 2024*. [arXiv:2412.00112](https://arxiv.org/abs/2412.00112)
- **RMD** — Training-free Retrieval-Augmented Motion Diffuse. *arXiv 2024*. [arXiv:2412.04343](https://arxiv.org/abs/2412.04343)
- **EnergyMoGen** — Compositional Human Motion Generation with Energy-Based Diffusion in Latent Space. *CVPR 2025*. [arXiv:2412.14706](https://arxiv.org/abs/2412.14706)
- **MOGO** — Residual Quantized Hierarchical Causal Transformer for Real-Time 3D Human Motion Generation. *arXiv 2025*. [arXiv:2506.05952](https://arxiv.org/abs/2506.05952)
- **PlanMoGPT** — Flow-Enhanced Progressive Planning for Text to Motion Synthesis. *arXiv 2025*. [arXiv:2506.17912](https://arxiv.org/abs/2506.17912)
- **MotionFlux** — Efficient Text-Guided Motion Generation through Rectified Flow Matching and Preference Alignment. *arXiv 2025*. [arXiv:2508.19527](https://arxiv.org/abs/2508.19527)
- **MoGIC** — Boosting Motion Generation via Intention Understanding and Visual Context. *arXiv 2025*. [arXiv:2510.02722](https://arxiv.org/abs/2510.02722)
- **Text2Interact** — High-Fidelity and Diverse Text-to-Two-Person Interaction Generation. *arXiv 2025*. [arXiv:2510.06504](https://arxiv.org/abs/2510.06504)
- **HY-Motion 1.0** — Scaling Flow Matching Models for Text-To-Motion Generation. *arXiv 2025*. [arXiv:2512.23464](https://arxiv.org/abs/2512.23464)
- **EasyTune** — Efficient Step-Aware Fine-Tuning for Diffusion-Based Motion Generation. *ICLR 2026*. [arXiv:2602.07967](https://arxiv.org/abs/2602.07967)
- **MoRL** — Reinforced Reasoning for Unified Motion Understanding and Generation. *arXiv 2026*. [arXiv:2602.14534](https://arxiv.org/abs/2602.14534)
- **T2M-Mamba** — Motion Periodicity-Saliency Coupling for Stable Text-Driven Motion Generation. *arXiv 2026*. [arXiv:2602.01352](https://arxiv.org/abs/2602.01352)
- **LaMoGen** — Language to Motion Generation Through LLM-Guided Symbolic Inference. *arXiv 2026*. [arXiv:2603.11605](https://arxiv.org/abs/2603.11605)
- **Motion-Adapter** — A Diffusion Model Adapter for Text-to-Motion Generation of Compound Actions. *arXiv 2026*. [arXiv:2604.16135](https://arxiv.org/abs/2604.16135)
- **ScaleMoGen** — Autoregressive Next-Scale Prediction for Human Motion Generation（HumanML3D FID 0.030）. *arXiv 2026*. [arXiv:2605.11704](https://arxiv.org/abs/2605.11704)
- **CMLA** — Towards Continual Motion-Language Agents: LoRA Variants for Incremental Understanding and Generation. *arXiv 2026*. [arXiv:2606.30266](https://arxiv.org/abs/2606.30266)

### 関連研究（隣接タスク: 動物・ダンス・ジェスチャ・理解 ほか）

> テキスト駆動モーション生成と直接は重ならない隣接領域。サイトでは「関連研究 (Related)」区分で表示・絞り込みできます。
> 既出の **AvatarCLIP / SinMDM / EgoLM / MotionLLM / HMIT(LLaMo) / X-MoGen / CoMoVi** も同区分に再分類しています。

- **OmniMotionGPT** — Animal Motion Generation with Limited Data（テキスト→動物モーション）. *CVPR 2024*. [arXiv:2311.18303](https://arxiv.org/abs/2311.18303)
- **EDGE** — Editable Dance Generation From Music（音楽→ダンス）. *CVPR 2023*. [arXiv:2211.10658](https://arxiv.org/abs/2211.10658)
- **Lodge** — A Coarse to Fine Diffusion Network for Long Dance Generation（音楽→ダンス）. *CVPR 2024*. [arXiv:2403.10518](https://arxiv.org/abs/2403.10518)
- **EMAGE** — Unified Holistic Co-Speech Gesture Generation（音声→ジェスチャ）. *CVPR 2024*. [arXiv:2401.00374](https://arxiv.org/abs/2401.00374)
- **Action2Motion** — Conditioned Generation of 3D Human Motions（行動条件・テキスト非依存）. *ACM MM 2020*. [arXiv:2007.15240](https://arxiv.org/abs/2007.15240)
- **Text2Gestures** — Transformer Network for Emotive Body Gestures（文→ジェスチャ）. *IEEE VR 2021*. [arXiv:2101.11101](https://arxiv.org/abs/2101.11101)
- **FACT (AI Choreographer)** — Music Conditioned 3D Dance Generation with AIST++（音楽→ダンス）. *ICCV 2021*. [arXiv:2101.08779](https://arxiv.org/abs/2101.08779)
- **DanceRevolution** — Long-Term Dance Generation with Music via Curriculum Learning（音楽→ダンス）. *ICLR 2021*. [arXiv:2006.06119](https://arxiv.org/abs/2006.06119)
- **ChoreoMaster** — Choreography-Oriented Music-Driven Dance Synthesis（音楽→ダンス）. *SIGGRAPH 2021*. [project](https://netease-gameai.github.io/ChoreoMaster/)
- **TextOp** — Real-time Interactive Text-Driven Humanoid Robot Motion Generation（ロボット）. *arXiv 2026*. [arXiv:2602.07439](https://arxiv.org/abs/2602.07439)
- **MotionBricks** — Scalable Real-Time Motions with Modular Latent Generative Model（速度・スタイル・キーフレーム制御, 非テキスト・NVIDIA）. *arXiv 2026*. [arXiv:2604.24833](https://arxiv.org/abs/2604.24833)
- **StabCoManip** — Stability-Driven Motion Generation for Object-Guided Human-Human Co-Manipulation（2人協調運搬・非テキスト）. *arXiv 2026*. [arXiv:2604.20336](https://arxiv.org/abs/2604.20336)

### データセット

- **KIT Motion-Language** (2016, *Big Data*) — The KIT Motion-Language Dataset. [arXiv:1607.03827](https://arxiv.org/abs/1607.03827)
- **AMASS** (2019, *ICCV*) — Archive of Motion Capture as Surface Shapes. [arXiv:1904.03278](https://arxiv.org/abs/1904.03278)
- **HumanAct12** (2020, *ACM MM*) — Action2Motion: Conditioned Generation of 3D Human Motions. [arXiv:2007.15240](https://arxiv.org/abs/2007.15240)
- **GRAB** (2020, *ECCV*) — A Dataset of Whole-Body Human Grasping of Objects. [arXiv:2008.11200](https://arxiv.org/abs/2008.11200)
- **AIST++** (2021, *ICCV*) — AI Choreographer: Music Conditioned 3D Dance Generation. [arXiv:2101.08779](https://arxiv.org/abs/2101.08779)
- **BABEL** (2021, *CVPR*) — Bodies, Action and Behavior with English Labels. [arXiv:2106.09696](https://arxiv.org/abs/2106.09696)
- **HumanML3D** (2022, *CVPR*) — Generating Diverse and Natural 3D Human Motions from Text. [repo](https://github.com/EricGuo5513/HumanML3D)
- **PoseScript** (2022, *ECCV*) — Linking 3D Human Poses and Natural Language. [arXiv:2210.11795](https://arxiv.org/abs/2210.11795)
- **BEHAVE** (2022, *CVPR*) — Dataset and Method for Tracking Human Object Interactions. [arXiv:2204.06950](https://arxiv.org/abs/2204.06950)
- **100STYLE** (2022, *SIGGRAPH*) — Real-Time Style Modelling of Human Locomotion. [Zenodo](https://zenodo.org/records/8127870)
- **Motion-X** (2023, *NeurIPS*) — A Large-scale 3D Expressive Whole-body Motion Dataset. [arXiv:2307.00818](https://arxiv.org/abs/2307.00818)
- **InterHuman** (2023, *IJCV*) — InterGen: Multi-human Motion Generation under Text. [arXiv:2304.05684](https://arxiv.org/abs/2304.05684)
- **HuMMan-MoGen** (2023, *NeurIPS*) — FineMoGen の細粒度ベンチマーク. [arXiv:2312.15004](https://arxiv.org/abs/2312.15004)
- **FLAG3D** (2023, *CVPR*) — A 3D Fitness Activity Dataset with Language Instruction. [arXiv:2212.04638](https://arxiv.org/abs/2212.04638)
- **Inter-X** (2024, *CVPR*) — Towards Versatile Human-Human Interaction Analysis. [arXiv:2312.16051](https://arxiv.org/abs/2312.16051)
- **BOTH57M** (2024, *CVPR*) — BOTH2Hands: Inferring 3D Hands from Text Prompts and Body Dynamics. [arXiv:2312.07937](https://arxiv.org/abs/2312.07937)
- **Nymeria** (2024, *ECCV*) — A Massive Collection of Multimodal Egocentric Daily Motion. [arXiv:2406.09905](https://arxiv.org/abs/2406.09905)
- **HIMO** (2024, *ECCV*) — Full-Body Human Interacting with Multiple Objects. [arXiv:2407.12371](https://arxiv.org/abs/2407.12371)
- **TRUMANS** (2024, *CVPR*) — Scaling Up Dynamic Human-Scene Interaction Modeling. [arXiv:2403.08629](https://arxiv.org/abs/2403.08629)
- **MotionFix** (2024, *SIGGRAPH Asia*) — Text-Driven 3D Human Motion Editing. [arXiv:2408.00712](https://arxiv.org/abs/2408.00712)
- **MotionLib (Being-M0)** (2024, *ICML 2025*) — Million-Level Human Motions. [arXiv:2410.03311](https://arxiv.org/abs/2410.03311)
- **SnapMoGen** (2025, *NeurIPS*) — Human Motion Generation from Expressive Texts. [arXiv:2507.09122](https://arxiv.org/abs/2507.09122)
- **Motion-X++** (2025, *arXiv*) — Large-Scale Multimodal 3D Whole-body Motion Dataset. [arXiv:2501.05098](https://arxiv.org/abs/2501.05098)
- **MotionMillion** (2025, *ICCV*) — Million-scale data (Go to Zero). [arXiv:2507.07095](https://arxiv.org/abs/2507.07095)

---

## 参考リソース

- [awesome-text-to-motion](https://zilize.github.io/awesome-text-to-motion/)（[GitHub](https://github.com/Zilize/awesome-text-to-motion)
