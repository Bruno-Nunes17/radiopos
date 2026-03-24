# RadioPos - Guia Digital de Radiologia

O **RadioPos** é uma aplicação web progressiva (PWA) desenvolvida para auxiliar estudantes e profissionais de radiologia no posicionamento preciso de exames. O projeto oferece um guia rápido, intuitivo e acessível, com foco em usabilidade móvel e suporte offline.

## 🚀 Funcionalidades

- **Exploração por Regiões:** Navegue por categorias anatômicas (Crânio, Tórax, Coluna, Pelve, Superiores, Inferiores).
- **Detalhes de Incidência:** Informações completas sobre posicionamento, raio central, DFF, KVp, mAs e tamanho do chassis.
- **Visualização de Mídia:** Imagens ilustrativas de posicionamento, radiografias de referência e vídeos demonstrativos (via YouTube).
- **Favoritos:** Salve incidências para acesso rápido, inclusive quando estiver offline.
- **Sincronização Offline:** Os dados são armazenados localmente no navegador para garantir o funcionamento sem internet.
- **Busca Inteligente:** Encontre rapidamente qualquer incidência pelo nome ou subcategoria.
- **Interface Moderna:** Design limpo com estados de carregamento (Skeleton Loaders) e transições suaves.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Roteamento:** [React Router 7](https://reactrouter.com/)
- **API Client:** [Orval](https://orval.dev/) (Geração automática de hooks/fetch)
- **PWA:** [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- **Banco de Dados Local:** IndexedDB (via `lib/offline-db.ts`)

## 📦 Como Executar o Projeto

### Pré-requisitos
- Node.js (v18+)
- npm ou pnpm

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/Bruno-Nunes17/radiopos.git
   ```
2. Entre na pasta do projeto:
   ```bash
   cd radiopos
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

### Execução
Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
Acesse `http://localhost:5173` no seu navegador.

### Build para Produção
Para gerar a versão otimizada da aplicação:
```bash
npm run build
```

## 📱 Suporte PWA
Para testar as funcionalidades de PWA (Service Workers, Manifesto), recomenda-se rodar o comando de preview após o build:
```bash
npm run preview
```

## 📄 Licença
Este projeto é para fins educacionais e profissionais na área de radiologia.

---
Desenvolvido com ❤️ para a comunidade radiológica.
