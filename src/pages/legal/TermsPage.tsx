import { Link as RouterLink } from 'react-router';

import { siteConfig } from '@/shared/config/siteConfig';

import { LegalLayout, LegalSection } from './LegalLayout';

/**
 * Página de Términos y Condiciones.
 * Ruta: /terminos
 *
 * Cumple con las exigencias de la Resolución 51/2017 sobre información
 * mínima en sitios de comercio electrónico en Argentina.
 */
export const TermsPage = () => {
  return (
    <LegalLayout
      title="Términos y condiciones"
      subtitle="Reglas que rigen el uso del sitio y las compras realizadas a través de él."
      lastUpdated="Mayo 2026"
    >
      <LegalSection title="1. Aceptación de los términos">
        <p>
          Al acceder y utilizar el sitio web de <strong>{siteConfig.brand.name}</strong> (en
          adelante, "el Sitio"), usted manifiesta haber leído, comprendido y aceptado en su
          totalidad estos Términos y Condiciones. Si no está de acuerdo con alguna de las
          disposiciones, le solicitamos que se abstenga de utilizar el Sitio.
        </p>
        <p>
          {siteConfig.legal.razonSocial} (en adelante, "la Empresa") se reserva el derecho de
          modificar estos términos en cualquier momento. Las modificaciones entrarán en vigencia
          desde su publicación en el Sitio.
        </p>
      </LegalSection>

      <LegalSection title="2. Datos de la empresa">
        <p>
          <strong>Razón social:</strong> {siteConfig.legal.razonSocial}
          <br />
          <strong>Ubicación:</strong> {siteConfig.legal.localidad}, {siteConfig.legal.provincia},{' '}
          {siteConfig.legal.pais}
          <br />
          <strong>Email de contacto:</strong>{' '}
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          <br />
          <strong>WhatsApp:</strong> {siteConfig.contact.whatsappDisplay}
        </p>
      </LegalSection>

      <LegalSection title="3. Productos ofrecidos">
        <p>
          A través del Sitio, la Empresa ofrece indumentaria con denim reciclado y bordados
          artesanales realizados a mano. Las fotografías de los productos son ilustrativas; pueden
          existir pequeñas variaciones de color, textura o detalles de bordado, ya que cada pieza es
          única y hecha a mano.
        </p>
        <p>
          Los precios publicados están expresados en pesos argentinos e incluyen IVA. La Empresa se
          reserva el derecho de modificar precios sin previo aviso, respetando siempre los pedidos
          confirmados.
        </p>
      </LegalSection>

      <LegalSection title="4. Compras y formas de pago">
        <p>
          Para realizar una compra, el usuario deberá seleccionar los productos, completar sus datos
          de envío y confirmar el pedido. La Empresa enviará una confirmación por email al recibir
          el pedido.
        </p>
        <p>
          Los medios de pago disponibles son los habilitados por Mercado Pago: tarjetas de crédito y
          débito, transferencia bancaria, dinero en cuenta y demás opciones que ofrezca la
          plataforma. La confirmación del pago es necesaria para procesar el envío.
        </p>
      </LegalSection>

      <LegalSection title="5. Derecho de arrepentimiento">
        <p>
          De acuerdo con el artículo 34 de la Ley 24.240 de Defensa del Consumidor, el usuario tiene
          derecho a revocar su compra durante los <strong>10 (diez) días corridos</strong> contados
          a partir de la recepción del producto, sin necesidad de expresar causa ni asumir costo
          alguno (salvo los gastos de devolución).
        </p>
        <p>
          Para ejercer este derecho, el usuario puede utilizar el{' '}
          <RouterLink to="/arrepentimiento">Botón de arrepentimiento</RouterLink> disponible en el
          Sitio. Más información en nuestra página de{' '}
          <RouterLink to="/cambios">Cambios y devoluciones</RouterLink>.
        </p>
      </LegalSection>

      <LegalSection title="6. Envíos">
        <p>
          La Empresa realiza envíos a todo el territorio argentino. Los tiempos y costos de envío se
          informan al momento de finalizar la compra. Para más detalle, consulte nuestra{' '}
          <RouterLink to="/envios">Política de envíos</RouterLink>.
        </p>
      </LegalSection>

      <LegalSection title="7. Propiedad intelectual">
        <p>
          Todos los contenidos del Sitio (textos, imágenes, fotografías, diseños, logos, marcas y
          demás elementos) son propiedad de la Empresa o se utilizan con autorización de sus
          titulares. Está prohibida su reproducción, distribución o uso sin autorización expresa por
          escrito.
        </p>
      </LegalSection>

      <LegalSection title="8. Limitación de responsabilidad">
        <p>
          La Empresa no será responsable por daños indirectos, lucro cesante o pérdida de
          oportunidades derivados del uso del Sitio o de los productos adquiridos, salvo que dicha
          responsabilidad sea exigida por la ley aplicable.
        </p>
      </LegalSection>

      <LegalSection title="9. Privacidad y datos personales">
        <p>
          El tratamiento de los datos personales de los usuarios se rige por nuestra{' '}
          <RouterLink to="/privacidad">Política de privacidad</RouterLink>, en cumplimiento con la
          Ley 25.326 de Protección de Datos Personales.
        </p>
      </LegalSection>

      <LegalSection title="10. Jurisdicción y ley aplicable">
        <p>
          Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Cualquier
          controversia será sometida a la jurisdicción de los tribunales ordinarios de{' '}
          {siteConfig.legal.provincia}, renunciando a cualquier otro fuero o jurisdicción que
          pudiera corresponder.
        </p>
        <p>
          Para consultas o reclamos previos a una eventual instancia judicial, el usuario puede
          comunicarse a{' '}
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> o a través
          del WhatsApp informado en el Sitio.
        </p>
      </LegalSection>

      <LegalSection title="11. Defensa del consumidor">
        <p>
          En caso de no resolver el conflicto en forma directa, el usuario puede recurrir al{' '}
          <strong>Sistema Nacional de Arbitraje de Consumo</strong> o a la autoridad de aplicación
          local. Más información en{' '}
          <a
            href="https://www.argentina.gob.ar/produccion/defensadelconsumidor"
            target="_blank"
            rel="noopener noreferrer"
          >
            argentina.gob.ar/produccion/defensadelconsumidor
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
};
