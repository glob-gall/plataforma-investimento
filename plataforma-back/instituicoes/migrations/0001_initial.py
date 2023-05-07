# Generated by Django 4.1.7 on 2023-04-07 22:07

import datetime
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Instituicoes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ('nome', models.CharField(max_length=255, default='')),
                ('thumb', models.CharField(default='', null=True)),
                ('codigo', models.IntegerField(blank=True, null=True)),
                ('ispb', models.CharField(max_length=10, default='')),
            ],
        ),
        migrations.RunSQL('''
            INSERT
            INTO instituicoes_instituicoes (ispb, codigo, nome)
            VALUES ('0', 1, 'Banco do Brasil S.A.'),
                ('208', 070, 'BRB - BANCO DE BRASILIA S.A.'),
                ('38121', NULL, 'Banco Central do Brasil - Selic'),
                ('38166', NULL, 'Banco Central do Brasil'),
                ('250699', 272, 'AGK CORRETORA DE CAMBIO S.A.'),
                ('315557', 136,	'CONFEDERAÇÃO NACIONAL DAS COOPERATIVAS CENTRAIS UNICRED LTDA. - UNICRED DO BRASIL'),
                ('360305', 104, 'CAIXA ECONOMICA FEDERAL'),
                ('394460', NULL, 'Secretaria do Tesouro Nacional - STN'),
                ('416968', 077, 'Banco Inter S.A.'),
                ('517645', 741, 'BANCO RIBEIRAO PRETO S.A.'),
                ('556603', 330, 'BANCO BARI DE INVESTIMENTOS E FINANCIAMENTOS S.A.'),
                ('558456', 739, 'Banco Cetelem S.A.'),
                ('795423', 743, 'Banco Semear S.A.'),
                ('806535', 100, 'Planner Corretora de Valores S.A.'),
                ('997185', 096, 'Banco B3 S.A.'),
                ('1023570', 747, 'Banco Rabobank International Brasil S.A.'),
                ('1027058', 362, 'CIELO S.A.'),
                ('1073966', 322, 'Cooperativa de Crédito Rural de Abelardo Luz - Sulcredi/Crediluz'),
                ('1181521', 748, 'BANCO COOPERATIVO SICREDI S.A.'),
                ('1330387', 350, 'COOPERATIVA DE CRÉDITO RURAL DE PEQUENOS AGRICULTORES E DA REFORMA AGRÁRIA DO CE'),
                ('1522368', 752, 'Banco BNP Paribas Brasil S.A.'),
                ('1634601', 091, 'CENTRAL DE COOPERATIVAS DE ECONOMIA E CRÉDITO MÚTUO DO ESTADO DO RIO GRANDE DO S'),
                ('1658426', 379, 'COOPERFORTE - COOPERATIVA DE ECONOMIA E CRÉDITO MÚTUO DOS FUNCIONÁRIOS DE INSTIT'),
                ('1701201', 399, 'Kirton Bank S.A. - Banco Múltiplo'),
                ('1800019', 108, 'PORTOCRED S.A. - CREDITO, FINANCIAMENTO E INVESTIMENTO'),
                ('1852137', 378, 'BBC LEASING S.A. - ARRENDAMENTO MERCANTIL'),
                ('2038232', 756, 'BANCO COOPERATIVO DO BRASIL S.A. - BANCOOB'),
                ('2276653', 360, 'TRINUS CAPITAL DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS S.A.'),
                ('2318507', 757, 'BANCO KEB HANA DO BRASIL S.A.'),
                ('2332886', 102, 'XP INVESTIMENTOS CORRETORA DE CÂMBIO,TÍTULOS E VALORES MOBILIÁRIOS S/A'),
                ('2398976', 084, 'UNIPRIME NORTE DO PARANÁ - COOPERATIVA DE CRÉDITO LTDA'),
                ('2685483', 180, 'CM CAPITAL MARKETS CORRETORA DE CÂMBIO, TÍTULOS E VALORES MOBILIÁRIOS LTDA'),
                ('2801938', 066, 'BANCO MORGAN STANLEY S.A.'),
                ('2819125', 015, 'UBS Brasil Corretora de Câmbio, Títulos e Valores Mobiliários S.A.'),
                ('2992317', 143, 'Treviso Corretora de Câmbio S.A.'),
                ('2992335', NULL, 'Câmara Interbancária de Pagamentos - CIP - LDL'),
                ('3012230', 062, 'Hipercard Banco Múltiplo S.A.'),
                ('3017677', 074, 'Banco J. Safra S.A.'),
                ('3046391', 099, 'UNIPRIME CENTRAL - CENTRAL INTERESTADUAL DE COOPERATIVAS DE CREDITO LTDA.'),
                ('3215790', 387, 'Banco Toyota do Brasil S.A.'),
                ('3311443', 326, 'PARATI - CREDITO, FINANCIAMENTO E INVESTIMENTO S.A.'),
                ('3323840', 025, 'Banco Alfa S.A.'),
                ('3502968', 315, 'PI Distribuidora de Títulos e Valores Mobiliários S.A.'),
                ('3532415', 075, 'Banco ABN Amro S.A.'),
                ('3609817', 040, 'Banco Cargill S.A.'),
                ('3751794', 307, 'Terra Investimentos Distribuidora de Títulos e Valores Mobiliários Ltda.'),
                ('3973814', 190, 'SERVICOOP - COOPERATIVA DE CRÉDITO DOS SERVIDORES PÚBLICOS ESTADUAIS DO RIO GRAN'),
                ('4062902', 296, 'VISION S.A. CORRETORA DE CAMBIO'),
                ('4184779', 063, 'Banco Bradescard S.A.'),
                ('4257795', 191, 'Nova Futura Corretora de Títulos e Valores Mobiliários Ltda.'),
                ('4307598', 382, 'FIDÚCIA SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO PORTE L'),
                ('4332281', 064, 'GOLDMAN SACHS DO BRASIL BANCO MULTIPLO S.A.'),
                ('4391007', NULL, 'Câmara Interbancária de Pagamentos'),
                ('4632856', 097, 'Credisis - Central de Cooperativas de Crédito Ltda.'),
                ('4715685', 016, 'COOPERATIVA DE CRÉDITO MÚTUO DOS DESPACHANTES DE TRÂNSITO DE SANTA CATARINA E RI'),
                ('4814563', 299, 'SOROCRED   CRÉDITO, FINANCIAMENTO E INVESTIMENTO S.A.'),
                ('4866275', 012, 'Banco Inbursa S.A.'),
                ('4902979', 003, 'BANCO DA AMAZONIA S.A.'),
                ('4913129', 060, 'Confidence Corretora de Câmbio S.A.'),
                ('4913711', 037, 'Banco do Estado do Pará S.A.'),
                ('5351887', 359, 'ZEMA CRÉDITO, FINANCIAMENTO E INVESTIMENTO S/A'),
                ('5442029', 159, 'Casa do Crédito S.A. Sociedade de Crédito ao Microempreendedor'),
                ('5463212', 085, 'Cooperativa Central de Crédito - Ailos'),
                ('5790149', 114, 'Central Cooperativa de Crédito no Estado do Espírito Santo - CECOOP'),
                ('6271464', 036, 'Banco Bradesco BBI S.A.'),
                ('7207996', 394, 'Banco Bradesco Financiamentos S.A.'),
                ('7237373', 004, 'Banco do Nordeste do Brasil S.A.'),
                ('7450604', 320, 'China Construction Bank (Brasil) Banco Múltiplo S/A'),
                ('7512441', 189, 'HS FINANCEIRA S/A CREDITO, FINANCIAMENTO E INVESTIMENTOS'),
                ('7652226', 105, 'Lecca Crédito, Financiamento e Investimento S/A'),
                ('7656500', 076, 'Banco KDB do Brasil S.A.'),
                ('7679404', 082, 'BANCO TOPÁZIO S.A.'),
                ('7853842', 286, 'COOPERATIVA DE CRÉDITO RURAL DE OURO   SULCREDI/OURO'),
                ('7945233', 093, 'PÓLOCRED   SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO PORT'),
                ('8240446', 391, 'COOPERATIVA DE CREDITO RURAL DE IBIAM - SULCREDI/IBIAM'),
                ('8253539', 273, 'Cooperativa de Crédito Rural de São Miguel do Oeste - Sulcredi/São Miguel'),
                ('8357240', 368, 'Banco CSF S.A.'),
                ('8561701', 290, 'Pagseguro Internet S.A.'),
                ('8609934', 259, 'MONEYCORP BANCO DE CÂMBIO S.A.'),
                ('9089356', 364, 'GERENCIANET S.A.'),
                ('9105360', 157, 'ICAP do Brasil Corretora de Títulos e Valores Mobiliários Ltda.'),
                ('9210106', 183, 'SOCRED S.A. - SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO P'),
                ('9274232', 014, 'STATE STREET BRASIL S.A. ? BANCO COMERCIAL'),
                ('9313766', 130, 'CARUANA S.A. - SOCIEDADE DE CRÉDITO, FINANCIAMENTO E INVESTIMENTO'),
                ('9512542', 127, 'Codepe Corretora de Valores e Câmbio S.A.'),
                ('9516419', 079, 'Banco Original do Agronegócio S.A.'),
                ('9554480', 340, 'Super Pagamentos e Administração de Meios Eletrônicos S.A.'),
                ('10264663', 081, 'BancoSeguro S.A.'),
                ('10398952', 133, 'CONFEDERAÇÃO NACIONAL DAS COOPERATIVAS CENTRAIS DE CRÉDITO E ECONOMIA FAMILIAR E'),
                ('10573521', 323, 'MERCADOPAGO.COM REPRESENTACOES LTDA.'),
                ('10664513', 121, 'Banco Agibank S.A.'),
                ('10690848', 083, 'Banco da China Brasil S.A.'),
                ('10853017', 138, 'Get Money Corretora de Câmbio S.A.'),
                ('10866788', 024, 'Banco Bandepe S.A.'),
                ('11165756', 384, 'GLOBAL FINANÇAS SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO'),
                ('11476673', 088, 'BANCO RANDON S.A.'),
                ('11495073', 319, 'OM DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS LTDA'),
                ('11581339', 274, 'MONEY PLUS SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E A EMPRESA DE PEQUENO PORT'),
                ('11703662', 095, 'Travelex Banco de Câmbio S.A.'),
                ('11758741', 094, 'Banco Finaxis S.A.'),
                ('11970623', 276, 'Senff S.A. - Crédito, Financiamento e Investimento'),
                ('12865507', 092, 'BRK S.A. Crédito, Financiamento e Investimento'),
                ('13009717', 047, 'Banco do Estado de Sergipe S.A.'),
                ('13059145', 144, 'BEXS BANCO DE CÂMBIO S/A'),
                ('13140088', 332, 'Acesso Soluções de Pagamento S.A.'),
                ('13220493', 126, 'BR Partners Banco de Investimento S.A.'),
                ('13293225', 325, 'Órama Distribuidora de Títulos e Valores Mobiliários S.A.'),
                ('13370835', 301, 'BPP Instituição de Pagamento S.A.'),
                ('13486793', 173, 'BRL Trust Distribuidora de Títulos e Valores Mobiliários S.A.'),
                ('13673855', 331, 'Fram Capital Distribuidora de Títulos e Valores Mobiliários S.A.'),
                ('13720915', 119, 'Banco Western Union do Brasil S.A.'),
                ('13884775', 396, 'HUB PAGAMENTOS S.A'),
                ('14190547', 309, 'CAMBIONET CORRETORA DE CÂMBIO LTDA.'),
                ('14388334', 254, 'PARANÁ BANCO S.A.'),
                ('14511781', 268, 'BARI COMPANHIA HIPOTECÁRIA'),
                ('15114366', 107, 'Banco Bocom BBM S.A.'),
                ('15173776', 412, 'BANCO CAPITAL S.A.'),
                ('15357060', 124, 'Banco Woori Bank do Brasil S.A.'),
                ('15581638', 149, 'Facta Financeira S.A. - Crédito Financiamento e Investimento'),
                ('16501555', 197, 'Stone Pagamentos S.A.'),
                ('16927221', 313, 'AMAZÔNIA CORRETORA DE CÂMBIO LTDA.'),
                ('16944141', 142, 'Broker Brasil Corretora de Câmbio Ltda.'),
                ('17184037', 389, 'Banco Mercantil do Brasil S.A.'),
                ('17298092', 184, 'Banco Itaú BBA S.A.'),
                ('17351180', 634, 'BANCO TRIANGULO S.A.'),
                ('17352220', 545, 'SENSO CORRETORA DE CAMBIO E VALORES MOBILIARIOS S.A'),
                ('17453575', 132, 'ICBC do Brasil Banco Múltiplo S.A.'),
                ('17772370', 298, 'Vip’s Corretora de Câmbio Ltda.'),
                ('17826860', 377, 'MS SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO PORTE LTDA'),
                ('18188384', 321, 'CREFAZ SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E A EMPRESA DE PEQUENO PORTE LT'),
                ('18236120', 260, 'Nu Pagamentos S.A.'),
                ('18520834', 129, 'UBS Brasil Banco de Investimento S.A.'),
                ('19307785', 128, 'MS Bank S.A. Banco de Câmbio'),
                ('20155248', 194, 'PARMETAL DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS LTDA'),
                ('21018182', 383, 'BOLETOBANCÁRIO.COM TECNOLOGIA DE PAGAMENTOS LTDA.'),
                ('21332862', 324, 'CARTOS SOCIEDADE DE CRÉDITO DIRETO S.A.'),
                ('22610500', 310, 'VORTX DISTRIBUIDORA DE TITULOS E VALORES MOBILIARIOS LTDA.'),
                ('22896431', 380, 'PICPAY SERVICOS S.A.'),
                ('23522214', 163, 'Commerzbank Brasil S.A. - Banco Múltiplo'),
                ('23862762', 280, 'Avista S.A. Crédito, Financiamento e Investimento'),
                ('24074692', 146, 'GUITTA CORRETORA DE CAMBIO LTDA.'),
                ('24537861', 343, 'FFA SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO PORTE LTDA.'),
                ('26563270', 279, 'COOPERATIVA DE CREDITO RURAL DE PRIMAVERA DO LESTE'),
                ('27098060', 335, 'Banco Digio S.A.'),
                ('27214112', 349, 'AL5 S.A. CRÉDITO, FINANCIAMENTO E INVESTIMENTO'),
                ('27351731', 374, 'REALIZE CRÉDITO, FINANCIAMENTO E INVESTIMENTO S.A.'),
                ('27652684', 278, 'Genial Investimentos Corretora de Valores Mobiliários S.A.'),
                ('27842177', 271, 'IB Corretora de Câmbio, Títulos e Valores Mobiliários S.A.'),
                ('28127603', 021, 'BANESTES S.A. BANCO DO ESTADO DO ESPIRITO SANTO'),
                ('28195667', 246, 'Banco ABC Brasil S.A.'),
                ('28650236', 292, 'BS2 Distribuidora de Títulos e Valores Mobiliários S.A.'),
                ('28719664', NULL, 'B3 SA - Brasil, Bolsa, Balcão - Segmento Cetip UTVM'),
                ('29011780', NULL, 'Câmara Interbancária de Pagamentos - CIP C3'),
                ('29030467', 751, 'Scotiabank Brasil S.A. Banco Múltiplo'),
                ('29162769', 352, 'TORO CORRETORA DE TÍTULOS E VALORES MOBILIÁRIOS LTDA'),
                ('30306294', 208, 'Banco BTG Pactual S.A.'),
                ('30723886', 746, 'Banco Modal S.A.'),
                ('31597552', 241, 'BANCO CLASSICO S.A.'),
                ('31872495', 336, 'Banco C6 S.A.'),
                ('31880826', 612, 'Banco Guanabara S.A.'),
                ('31895683', 604, 'Banco Industrial do Brasil S.A.'),
                ('32062580', 505, 'Banco Credit Suisse (Brasil) S.A.'),
                ('32402502', 329, 'QI Sociedade de Crédito Direto S.A.'),
                ('32648370', 196, 'FAIR CORRETORA DE CAMBIO S.A.'),
                ('32997490', 342, 'Creditas Sociedade de Crédito Direto S.A.'),
                ('33042151', 300, 'Banco de la Nacion Argentina'),
                ('33042953', 477, 'Citibank N.A.'),
                ('33132044', 266, 'BANCO CEDULA S.A.'),
                ('33147315', 122, 'Banco Bradesco BERJ S.A.'),
                ('33172537', 376, 'BANCO J.P. MORGAN S.A.'),
                ('33264668', 348, 'Banco XP S.A.'),
                ('33466988', 473, 'Banco Caixa Geral - Brasil S.A.'),
                ('33479023', 745, 'Banco Citibank S.A.'),
                ('33603457', 120, 'BANCO RODOBENS S.A.'),
                ('33644196', 265, 'Banco Fator S.A.'),
                ('33657248', 007, 'BANCO NACIONAL DE DESENVOLVIMENTO ECONOMICO E SOCIAL'),
                ('33775974', 188, 'ATIVA INVESTIMENTOS S.A. CORRETORA DE TÍTULOS, CÂMBIO E VALORES'),
                ('33862244', 134, 'BGC LIQUIDEZ DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS LTDA'),
                ('33885724', 029, 'Banco Itaú Consignado S.A.'),
                ('33923798', 243, 'Banco Máxima S.A.'),
                ('34088029', 397, 'LISTO SOCIEDADE DE CREDITO DIRETO S.A.'),
                ('34111187', 078, 'Haitong Banco de Investimento do Brasil S.A.'),
                ('34335592', 355, 'ÓTIMO SOCIEDADE DE CRÉDITO DIRETO S.A.'),
                ('34711571', 367, 'VITREO DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS S.A.'),
                ('35977097', 373, 'UP.P SOCIEDADE DE EMPRÉSTIMO ENTRE PESSOAS S.A.'),
                ('36113876', 111, 'OLIVEIRA TRUST DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIARIOS S.A.'),
                ('36586946', 408, 'BÔNUSCRED SOCIEDADE DE CRÉDITO DIRETO S.A.'),
                ('37241230', 404, 'SUMUP SOCIEDADE DE CRÉDITO DIRETO S.A.'),
                ('37880206', 403, 'CORA SOCIEDADE DE CRÉDITO DIRETO S.A.'),
                ('40303299', 306, 'PORTOPAR DISTRIBUIDORA DE TITULOS E VALORES MOBILIARIOS LTDA.'),
                ('42272526', 017, 'BNY Mellon Banco S.A.'),
                ('43180355', 174, 'PEFISA S.A. - CRÉDITO, FINANCIAMENTO E INVESTIMENTO'),
                ('44189447', 495, 'Banco de La Provincia de Buenos Aires'),
                ('45246410', 125, 'Plural S.A. Banco Múltiplo'),
                ('46518205', 488, 'JPMorgan Chase Bank, National Association'),
                ('48795256', 065, 'Banco AndBank (Brasil) S.A.'),
                ('49336860', 492, 'ING Bank N.V.'),
                ('50579044', 145, 'LEVYCAM - CORRETORA DE CAMBIO E VALORES LTDA.'),
                ('50585090', 250, 'BCV - BANCO DE CRÉDITO E VAREJO S.A.'),
                ('52904364', 354, 'NECTON INVESTIMENTOS  S.A. CORRETORA DE VALORES MOBILIÁRIOS E COMMODITIES'),
                ('52937216', 253, 'Bexs Corretora de Câmbio S/A'),
                ('53518684', 269, 'BANCO HSBC S.A.'),
                ('54403563', 213, 'Banco Arbi S.A.'),
                ('54641030', NULL, 'BMF Bovespa S.A. - Bolsa de Valores, Mercadorias e Futuros - Camara BMFBOVESPA'),
                ('55230916', 139, 'Intesa Sanpaolo Brasil S.A. - Banco Múltiplo'),
                ('57839805', 018, 'Banco Tricury S.A.'),
                ('58160789', 422, 'Banco Safra S.A.'),
                ('58497702', 630, 'Banco Smartbank S.A.'),
                ('58616418', 224, 'Banco Fibra S.A.'),
                ('59109165', 393, 'Banco Volkswagen S.A.'),
                ('59118133', 600, 'Banco Luso Brasileiro S.A.'),
                ('59274605', 390, 'BANCO GM S.A.'),
                ('59285411', 623, 'Banco Pan S.A.'),
                ('59588111', 655, 'Banco Votorantim S.A.'),
                ('60394079', 479, 'Banco ItauBank S.A.'),
                ('60498557', 456, 'Banco MUFG Brasil S.A.'),
                ('60518222', 464, 'Banco Sumitomo Mitsui Brasileiro S.A.'),
                ('60701190', 341, 'ITAÚ UNIBANCO S.A.'),
                ('60746948', 237, 'Banco Bradesco S.A.'),
                ('60814191', 381, 'BANCO MERCEDES-BENZ DO BRASIL S.A.'),
                ('60850229', 613, 'Omni Banco S.A.'),
                ('60872504', 652, 'Itaú Unibanco Holding S.A.'),
                ('60889128', 637, 'BANCO SOFISA S.A.'),
                ('60934221', NULL, 'BMF Bovespa S/A - Bolsa de Valores, Mercadorias e Futuros - Camara Cambio'),
                ('61024352', 653, 'BANCO INDUSVAL S.A.'),
                ('61033106', 069, 'Banco Crefisa S.A.'),
                ('61088183', 370, 'Banco Mizuho do Brasil S.A.'),
                ('61182408', 249, 'Banco Investcred Unibanco S.A.'),
                ('61186680', 318, 'Banco BMG S.A.'),
                ('61348538', 626, 'BANCO C6 CONSIGNADO S.A.'),
                ('61444949', 270, 'Sagitur Corretora de Câmbio Ltda.'),
                ('61533584', 366, 'BANCO SOCIETE GENERALE BRASIL S.A.'),
                ('61723847', 113, 'Magliano S.A. Corretora de Cambio e Valores Mobiliarios'),
                ('61747085', 131, 'TULLETT PREBON BRASIL CORRETORA DE VALORES E CÂMBIO LTDA'),
                ('61809182', 011, 'CREDIT SUISSE HEDGING-GRIFFO CORRETORA DE VALORES S.A'),
                ('61820817', 611, 'Banco Paulista S.A.'),
                ('62073200', 755, 'Bank of America Merrill Lynch Banco Múltiplo S.A.'),
                ('62109566', 089, 'CREDISAN COOPERATIVA DE CRÉDITO'),
                ('62144175', 643, 'Banco Pine S.A.'),
                ('62169875', 140, 'Easynvest - Título Corretora de Valores SA'),
                ('62232889', 707, 'Banco Daycoval S.A.'),
                ('62237649', 288, 'CAROL DISTRIBUIDORA DE TITULOS E VALORES MOBILIARIOS LTDA.'),
                ('62285390', 363, 'SOCOPA SOCIEDADE CORRETORA PAULISTA S.A.'),
                ('62287735', 101, 'RENASCENCA DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS LTDA'),
                ('62331228', 487, 'DEUTSCHE BANK S.A. - BANCO ALEMAO'),
                ('62421979', 233, 'Banco Cifra S.A.'),
                ('65913436', 177, 'Guide Investimentos S.A. Corretora de Valores'),
                ('68757681', 365, 'SOLIDUS S.A. CORRETORA DE CAMBIO E VALORES MOBILIARIOS'),
                ('68900810', 633, 'Banco Rendimento S.A.'),
                ('71027866', 218, 'Banco BS2 S.A.'),
                ('71371686', 169, 'BANCO OLÉ CONSIGNADO S.A.'),
                ('71590442', 293, 'Lastro RDV Distribuidora de Títulos e Valores Mobiliários Ltda.'),
                ('71677850', 285, 'Frente Corretora de Câmbio Ltda.'),
                ('73622748', 080, 'B&T CORRETORA DE CAMBIO LTDA.'),
                ('74828799', 753, 'Novo Banco Continental S.A. - Banco Múltiplo'),
                ('75647891', 222, 'BANCO CRÉDIT AGRICOLE BRASIL S.A.'),
                ('76461557', 281, 'Cooperativa de Crédito Rural Coopavel'),
                ('76543115', 754, 'Banco Sistema S.A.'),
                ('78157146', 098, 'Credialiança Cooperativa de Crédito Rural'),
                ('78626983', 610, 'Banco VR S.A.'),
                ('78632767', 712, 'Banco Ourinvest S.A.'),
                ('81723108', 010, 'CREDICOAMO CREDITO RURAL COOPERATIVA'),
                ('89960090', 283, 'RB CAPITAL INVESTIMENTOS DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS LIMITADA'),
                ('90400888', 033, 'BANCO SANTANDER (BRASIL) S.A.'),
                ('91884981', 217, 'Banco John Deere S.A.'),
                ('92702067', 041, 'Banco do Estado do Rio Grande do Sul S.A.'),
                ('92856905', 117, 'ADVANCED CORRETORA DE CÂMBIO LTDA'),
                ('92874270', 654, 'BANCO DIGIMAIS S.A.'),
                ('92875780', 371, 'WARREN CORRETORA DE VALORES MOBILIÁRIOS E CÂMBIO LTDA.'),
                ('92894922', 212, 'Banco Original S.A.'),
                ('94968518', 289, 'DECYSEO CORRETORA DE CAMBIO LTDA.')
        '''),
    ]
