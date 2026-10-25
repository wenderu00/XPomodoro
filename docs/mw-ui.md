# XPomodoro com o @mw/ui

A UI usa o design system [@mw/ui](https://wenderu00.github.io/mwds/), instalado pelo registry publicado (`npx shadcn@latest add @marcio/<item>`). Os componentes ficam em `src/components/ui/` e só usam tokens: `--color-*: initial` no `globals.css` apaga a paleta padrão do Tailwind.

## Mapeamento

| Elemento do XPomodoro | Como é feito com o @mw/ui |
|---|---|
| Cabeçalho com marca, abas e XP | `Navbar` com `collapseBelow="lg"` (aba atual com `aria-current`) e `Badge` accent com o troféu |
| Controle de tema | `ThemeToggle` (sistema, escuro, claro) no cabeçalho a partir de lg e no menu abaixo disso, com o `ThemeScript` no `<head>` para não piscar |
| Painel da sessão | `Card` |
| Progresso dos 4 ciclos | `Progress` `size="sm"` com o rótulo "Ciclo N de 4" |
| Iniciar ciclo, descartar sessão, pular cronômetro | `Button` primário e `ghost` |
| Cronômetro | composição: `font-mono text-display-xl tabular-nums` com `role="timer"` |
| Feedback baixo, médio e alto | três `Button` `secondary` |
| Resumo da sessão | `FormField` + `Textarea` + `Button` desabilitado sem texto |
| Sessão concluída | `EmptyState` com ícone e ação |
| Carregando | `Spinner` |
| Manual XP e A filosofia | `PageHeader` + `FeatureGrid` com 3 colunas |
| Cores scarlet, troféu amarelo e verde de sucesso | accent do DS, `text-accent-text` e `text-success-text` |

## Tour de onboarding

O site original tinha um tour de 6 passos com `react-joyride`, que o DS não cobria. O `Tour` entrou no @mw/ui 0.13.0 e substitui o joyride em `OnboardingTour.tsx`:

- os alvos são marcados com `data-tour`;
- o tour abre sozinho na primeira sessão;
- o botão de ajuda do cabeçalho reabre o tour, voltando antes ao ciclo 1;
- a chave `@xpomodoro:tour_completed` do `localStorage` é a mesma de antes.

## O que ainda falta no @mw/ui

### Cronômetro (lacuna parcial)

Ele foi montado à mão e funciona. Um componente `Countdown` no DS valeria a pena se outro app precisar. Esse componente:

- marcaria o elemento como `role="timer"`;
- teria um estado de pausa;
- usaria números de largura fixa;
- deixaria claro que ele não deve anunciar cada segundo, porque o leitor de tela falaria sem parar.

## Atritos no @mw/ui encontrados nesta migração

1. **O `init` ignora o `src/`.** O item `marcio-tokens` grava `"css": "app/globals.css"` fixo no `components.json`, e o init falha com `ENOENT` em projetos criados com `--src-dir`. Corrigi o caminho à mão e apliquei os tokens com `shadcn add @marcio/marcio-tokens`.
2. **Cada `add` duplica blocos do `globals.css`.** Os `@media (prefers-reduced-motion: no-preference)` dentro de `@utility mw-caret` e `@utility mw-typing` são repetidos a cada `add`. Cada `add` também devolve o `@custom-variant dark (&:is(.dark *))`, que não serve para o DS, porque ele usa `data-theme`.
3. **A `Navbar` usa `<a>` simples.** Os links não recebem o `basePath` do Next sozinhos e fazem navegação completa, sem a navegação do lado do cliente. Aqui o `basePath` vai por `NEXT_PUBLIC_BASE_PATH`. Uma prop para trocar o elemento do link (`asChild` ou `linkComponent`) resolveria.
4. **O padrão do `create-next-app@16.4` não exporta.** `cacheComponents` e `partialPrefetching` vêm ligados e quebram `output: "export"` com `PPR cannot be enabled in export mode`. A página Primeiros passos não cobre site estático.
5. **O vitest 5 não instala ao lado do `@types/node@^20`** que o create-next-app põe. Foi preciso subir os tipos.
6. **O `add` reescreve as fontes do `layout.tsx`.** Ao instalar o `tour`, o CLI renomeou as variáveis de fonte e trocou a template string por `cn(...)`. Funciona igual, mas mexe em código do app sem pedir.
7. **O `Tour` cria um `ResizeObserver` mesmo fechado.** Nos testes com jsdom, que não tem `ResizeObserver`, qualquer tela que monta o `Tour` quebra até haver um polyfill no `vitest.setup.ts`. Em navegador funciona.
8. **O balão do `Tour` sai cortado em telas muito baixas.** Com 347px de altura, o balão do último passo, posicionado em cima do botão, sai cortado no topo. Com 700px, cabe inteiro.
