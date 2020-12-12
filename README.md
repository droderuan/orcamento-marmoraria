# orcamento-marmoraria

Este projeto possui algumas depêndencias nativas no android, pois o desenvolvimento estava sendo por um emulador do 
android. Alterações no código nativo do android foram para **pedir permissões** ao usuário e **configurações do firebase**.

## Depêndencias

### Firebase
O firebase foi adicionado numa estapa mais posterior do projeto, logo não possui uma implementação muito presa. Foram
usados três serviços: de autenticação, firebase functions e o cloud firestore. Dos 3 configurados, apenas dois foram
realmente usados. Caso necessário, siga este link para configurar [o firebase](https://rnfirebase.io/).
O firebase functions seria utilizado apenas para gerar o PDF e depois retornado os dispositivo, mas isso não chegou a ser
concluido.

### Permissões
Para permissões no android, utilizei uma biblioteca chamada [react-native-permissions](https://github.com/zoontek/react-native-permissions).
Foram adicionadas apenas duas permissões, uma de escrita no armazenamento externo e outra de leitura. Como falei, não há
permissões para o IOS pois não lidei com o emulador de IOS.

```
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
 <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### Async-Storage
  Para salvar os orçamentos, criei uma forma de salvar usando chave valor. O usuário também fica salvo no async-storage
  segue as chaves utilizadas:

  * ``@apporcamento:budget:id:`` - Armazenas todos os orçamentos
  * ``@apporcamento:user:`` - Armazena as iformações de login do usuário

Das etapas que eram necessárias para um MVP, só restou a funcionalidade de geração de PDF para que pudesse ser enviado
pelo próprio dispositivo. A ideia era criar uma função no firebase para que pudesse servir essa funcionalidade.

O restante do projeto não possui mais nenhuma particularidade, seguindo como qualquer outro projeto comum em react-native.


