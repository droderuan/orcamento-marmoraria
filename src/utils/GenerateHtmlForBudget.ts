import Budget from '@dtos/Budget';

export default function GenerateHtmlForBudget(budget: Budget): string {
  return `
    <h1>${budget.client.name}</h1>
    <h2>Produtos</h2>
    ${budget.rooms.map(
      room => `
      <h3>${room.name}</h3>
      ${room.products.map(
        product => `
        <h4>${product.name}<h4>
      `,
      )}
    `,
    )}
  `;
}
