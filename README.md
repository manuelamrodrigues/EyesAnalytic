São Paulo Tech School 
<br><br>
 

 

 

Dominique Dornan 
<br>
Eduardo Facini 
<br>
Elerson Sabará  
<br>
Manuela Monteiro 
<br>
Marcelo Henrique  
<br>
Pedro Vinícius 
<br><br><br>
 

 

 

 

 

 

 

 

Eyes Analytic 
<br>
Monitoramento dos componentes de hardware de switches 
<br><br><br>
 

 

 

 

 

 

 

 

 

 

São Paulo  
<br>
2024 
<br><br><br>
 

 

<b>Contexto</b>
<br>
<b>1.1 O que é switch?</b>  
<br>
Os switches são hardwares de rede responsáveis por conectar vários dispositivos, como computadores, impressoras e servidores que estão na mesma rede permitindo com que dispositivos conectados compartilhem informação entre si. De maneira geral, eles são componentes físicos ou lógicos que encaminham pacotes de dados em redes locais baseada no padrão Ethernet. 
<br><br>
 

<b>1.2 O que é rede LAN e Ethernet?/<b>  
<br>
A rede LAN (Local Area Network) é o nome genérico para uma rede local que conecta dispositivos em uma área restrita (como residência, escritório ou campus universitário). Sua principal característica é a limitação ao espaço geográfico pequeno.  
<br>
A Ethernet é a tecnologia específica para a criação da rede LAN. É um padrão de comunicação que define como os dispositivos se comunicam entre si numa mesma rede e como os dados são formatados e transmitidos. Ela usa cabos e switches para criar uma rede física e estável. Ela também define protocolos para comunicação de dados. 
<br><br>
 

<b>1.3 O que é MAC Address?</b> 
<br>
O MAC Address, ou Media Acess Control Address, é um endereço exclusivo, grafado através de número hexadecimal que identifica todo hardware que usa conexão Ethernet ou Wi-Fi.  
<br><br>
 

<b>1.4 Como a rede LAN, a Ethernet e o MAC Address se relacionam com o switch?</b>  
<br>
Como qualquer dispositivo físico conectado a rede LAN possui um número MAC Address, o switch tem por responsabilidade gravar esses endereços para transmitir esses pacotes de dados corretamente para o destino final. Portanto, o MAC Address serve para que o switch identifique e trace rotas de comunicação entre os dispositivos. 
<br><br>
 

<b>1.5 Tipos de switch</b> 
<br>
Modulares: Permite que adicione módulos de expansão ao switches, proporcionando uma maior flexibilidade para lidar com mudanças na estrutura da rede da empresa; 
<br>
Configuração fixa: Número fixo de portas e geralmente não são expansíveis. Pode ser dividido em:  
<br>
Não gerenciados: Custo de aquisição mais barato e ideal para cenários que requerem básicas camadas de rede. Como o nome sugere, eles não podem ser modificados ou gerenciados, basta conectá-los e não exigem nenhuma configuração; 
<br>
Inteligentes: Oferecem certos níveis de gerenciamento e mais leves em recursos, tendo uma interface de gerenciamento. São indicados para infraestruturas médias ou redes de baixa complexidade;  
<br>
Gerenciados L2 e L3: Oferecem um conjunto mais abrangente de recursos, mais altos níveis de controle, segurança e gerenciamento e oferecem maior escalabilidade de sua rede. Consequentemente, são indicados para grandes infraestruturas  
<br><br>
 

<b>1.6 Qual a diferença de switch para roteador?</b>  
<br>
O roteador é responsável por conectar redes diferentes. A divergência entre switches e roteadores está no fato de que um switch vai ser responsável pela comunicação entre os dispositivos em uma rede privada, já o roteador vai ser responsável por gerenciar o acesso dos dispositivos a internet. 
<br><br>
 

 

<b>1.7 Como é a arquitetura de um switch e como ele funciona?</b> 
<br>
A estrutura de hardware de um switch pode ser variada dependendo do seu tipo e capacidade. No entanto, sua arquitetura básica é composta pelos componentes:  
<br>
Chassi: É a parte externa, usada para proteger os componentes internos;  
<br>
Ventilador: Usado para dissipar o calor, garantindo uma operação estável a longo prazo; 
<br>
Fonte de alimentação: Fornece a energia necessária para seu funcionamento; 
<br>
Portas de rede: Conectam os switches a outros dispositivos de rede;  
<br>
CPU: Gerencia as operações internas do switch, como a gestão de configuração e execução de protocolos de rede; 
<br>
Memória RAM e ROM: Respectivamente, armazena informações temporárias, como endereços MAC; contém o sistema operacional do switch, que é responsável pelo controle e pela operação do hardware; 
<br>
Memória de Endereços MAC: Armazena as associações entre endereços MAC e portas do switch; 
<br>
Comutador: Decide para qual porta o pacote deve ser encaminhado baseando-se na Memória de Endereços MAC 
<br>
Encaminhador: Responsável por encaminhar os pacotes após serem decididos pelo comutador; 
<br>
Interface de Rede: Gerencia a comunicação física e a transmissão de dados entre o switch e outros dispositivos na rede; 
<br>
Interface de Gerenciamento: Pode incluir interfaces web ou CLI (linha de comando) para configuração, monitoramento e administração do switch. 
<br><br>
 

<b>1.8 Problemas de rede- Google, 2019 !!!!!!!</b> 
<br>
Em 02/12/2019, os serviços da Google foram afetados devido a uma falha na rede de switches. Esse problema afetou o acesso ao Gmail,  
<br><br>
 

<b>Justificativa</b>
<br>
Agregar valor ao negócio mitigando falhas. 
<br><br>
 

<b>Objetivos</b>
<br>
Desenvolver um sistema que monitora os componentes de hardware de um switch; 
<br>
Utilizar conceitos de ITIL de Monitoramento de Serviços, Gestão de Incidentes e Gestão de Problemas;  
<br>
Monitorar os componentes de hardware para mitigar problemas; 
<br>
Entregar o projeto funcionando adequadamente em 03/12/2024; 
<br><br>
 

<b>Escopo</b>
<br>
<b>4.1 Descrição resumida do projeto</b>
<br>
O projeto Eyes Analytic tem o objetivo de monitorar os componentes de hardware dos switches, como CPU, memória RAM e armazenamento. O sistema coletará dados em tempo real sobre esses elementos, permitindo identificar possíveis erros de desempenho e prever falhas antes que elas afetem a operação da empresa. As métricas serão consolidadas em um painel de controle central - dashboard, facilitando a gestão e a manutenção ágil da infraestrutura de TI. 
<br><br>
 

<b>4.2 MindMap</b>
<br>
O MindMap é a técnica para representar graficamente ideias e informações conectando conceitos e facilitando a compreensão de um tema, nesse caso, demonstra as principais funcionalidades do sistema Eyes Analytic. 
<br><br>
 

<b>4.3 Resultados esperados</b>  
<br>
Os resultados esperados pela Eyes Analytic são: 
<br>
Detecção ágil de problemas com o uso de dashboards: Dados sobre a CPU, memória RAM e o armazenamento serão dispostos em dashboards que ajudarão na identificação de possíveis falhas permitindo correções antes de impactar operações; 
<br>
Otimização do desempenho: Garantir que os componentes estejam sendo utilizados de forma eficiente e que agregue valor ao negócio; 
<br>
Redução do tempo de inatividade: Diminuição de GMUD’s não planejadas devido a capacidade de monitoramento; 
<br>
Melhoria na segurança: Monitorando os componentes de hardware pode-se identificar problemas anormais que podem indicar falhas de segurança. 
<br><br>
 

<b>4.4 Recursos necessários</b> 
<br>
Computadores com acesso ao Wi-Fi para desenvolver a aplicação; 
<br>
Desenvolvedores back-end e front-end;  
<br>
Desenvolvedores do banco de dados;  
<br>
Profissionais de suporte ao cliente; 
<br>
Switches; 
<br>
Profissionais treinados para acompanhar as métricas pela dashboard; 
<br><br>
 

<b>4.5 Backlog</b>  
<br><br>
<b>4.6 Integrantes e Macro Cronograma</b>  
<br>
O projeto contará com 6 integrantes, sendo eles: Dominique Dornan, Eduardo Facini, Elerson Sabará, Manuela Monteiro, Marcelo Henrique e Pedro Vinícius. Os integrantes foram dispostos nas seguintes funções seguindo o macro cronograma:  
<br><br>
 

<b>4.7 Planilha de riscos</b>
<br>
A planilha de riscos é uma ferramenta utilizada para avaliar os riscos envolvidos durante a execução de um projeto ou no ambiente de trabalho. Abaixo, estão identificados os riscos mais prováveis de acontecerem durante a execução da Sprint: 
<br><br>
 

 

<b>4.8 Diagrama de Visão de Negócio</b>
<br><br>
<b>4.9 Diagrama de Solução</b> 
<br>
O diagrama de solução tem como objetivo representar graficamente a arquitetura e a solução de um projeto. Abaixo, estão detalhados os componentes da arquitetura do Eyes Analytic, oferecendo uma visão clara e estruturada dos elementos que compõem a solução. 
<br><br>
 

 

<b>4.10 Premissas</b>  
<br>
Será de responsabilidade do cliente treinar seus funcionários para utilizarem a nova aplicação;  
<br>
Será de responsabilidade do cliente ter computadores e Wi-Fi para acesso a aplicação; 
<br>
O projeto será para todos os tipos de dispositivos; 
<br>
Será de responsabilidade do cliente possuir switches; 
<br><br>
  

<b>4.11 Restrições</b>
<br>
Não será entregue uma rolagem horizontal;  
<br>
O projeto não será entregue antes do dia 02/12; 
<br>
Não nos responsabilizamos por falhas no hardware dos switches; 
<br><br>
 

<b>4.12 Stakeholders</b>  
<br>
Os stakeholders para esse projeto incluem empresas que utilizam switches para conexão de rede pois poderão monitorar os componentes de hardware do aparelho, mitigando eventuais problemas e contribuindo para o fortalecimento de suas operações. Além disso, os desenvolvedores do projeto se beneficiarão ao enriquecer seu conhecimento e entregar uma aplicação útil e necessária.  
<br><br>
  

<b>4.13 Users Stories e Lean UX</b> 
<br><br>
<b>4.14 Política de gestão de acessos</b> 
<br>
Para a hospedagem dessa aplicação, usaremos o serviço de Cloud Computing oferecido pela Amazon, a AWS. Esse serviço fornece recursos tecnológicos sob demanda permitindo com que as empresas e desenvolvedores criem, gerenciem e escalem projetos de forma flexível e econômica. 
<br>
Nesse caso, a EyesAnalytic utilizará o laboratório de aprendizagem da AWS. Nele, criaremos uma máquina virtual a partir do sistema operacional Ubuntu. Utilizaremos o tipo de instância NOME DA INSTÂNCIA que se refere a configuração específica dos recursos de computação: COLOCAR CARACTERÍSTICAS DA INSTÂNCIA ESCOLHIDA. Ainda, serão utilizados 20GB de armazenamento para suportar a aplicação. 
<br><br>
 

<b>4.15 Modelagem do Banco de Dados</b> 
<br><br><br><br>
 

 

 

 

https://www.controle.net/faq/ethernet--o-que-e--como-funciona-e-para-que-serve 

https://www.techtudo.com.br/noticias/2017/02/entenda-o-seu-roteador-o-que-e-lan-wan-wlan-dns-wps-e-ethernet.ghtml 

https://www.controle.net/faq/network-switches-o-que-e-um-switch-de-rede 

https://infob.com.br/diferencas-entre-um-switch-e-um-roteador/ 

https://www.fibermall.com/pt/blog/what-is-an-ethernet-switch.htm 

 

 

 

 

 

 
