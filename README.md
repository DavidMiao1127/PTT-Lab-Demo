# Personalized Turing Test Lab · Demo

[简体中文](README.zh-CN.md) · [Annotator view](https://davidmiao1127.github.io/PTT-Lab-Demo/) · [Researcher view](https://davidmiao1127.github.io/PTT-Lab-Demo/#admin) · [Full platform](https://github.com/DavidMiao1127/PTT-Lab)

An interactive, bilingual demonstration of PTT-Lab’s annotation and research inspection workflow.

- **Annotators** choose scholars and an information exposure condition, read the corresponding profiles, compare anonymous A/B texts, rate confidence, and provide reasons supported by textual evidence.
- **Researchers** explore simulated statistics by granularity, information exposure, and eight baselines, or inspect individual records, text selections, and pointer traces. The demonstration contains 162 simulated rounds and 3,888 judgments.
- **Corpus exchange** supports numbered task exports and JSONL imports of generated outputs or complete pairs. Imported pairs are available in the annotator view within the same page session.

## Corpus

The bundled sample contains **630 pairs across 21 pseudonymous scholars** in law, economics, philosophy, computer science, and literature. Each scholar has 10 passage-generation, 10 paragraph-infilling, and 10 sentence-infilling tasks.

The corpus and answer labels are accessible in the browser. Researcher results and interaction traces are simulated. Imports and annotation progress are cleared on refresh.

## Run locally

Use Node.js 24 and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

To preview the production build:

```sh
pnpm build
pnpm preview
```

Open the local address printed in the terminal. Append `#admin` for the researcher view.

## GitHub Pages

Set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The included workflow builds and deploys `dist/` on pushes to `main`, or when run manually from Actions.
