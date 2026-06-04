import { siteConfig } from '@/shared/config/siteConfig';

import { LegalLayout, LegalSection } from './LegalLayout';

/**
 * Página de Política de privacidad.
 * Ruta: /privacidad
 *
 * Cumple con la Ley 25.326 de Protección de Datos Personales y con los
 * principios del Reglamento de Protección de Datos.
 */
export const PrivacyPage = () => {
  return (
    <LegalLayout
      title="Política de privacidad"
      subtitle="Cómo recopilamos, usamos y protegemos tus datos personales."
      lastUpdated="Mayo 2026"
    >
      <LegalSection title="1. Responsable del tratamiento">
        <p>
          El responsable del tratamiento de los datos personales recogidos a través de este sitio es{' '}
          <strong>{siteConfig.legal.razonSocial}</strong> (en adelante, "la Empresa"), con sede en{' '}
          {siteConfig.legal.localidad}, {siteConfig.legal.provincia}, {siteConfig.legal.pais}.
        </p>
        <p>
          Para cualquier consulta vinculada a sus datos personales, puede escribirnos a{' '}
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
        </p>
      </LegalSection>

      <LegalSection title="2. Datos que recopilamos">
        <p>Recopilamos únicamente los datos necesarios para brindar nuestros servicios:</p>
        <ul>
          <li>
            <strong>Datos de identificación:</strong> nombre completo, DNI (en caso de ser requerido
            para envíos o facturación).
          </li>
          <li>
            <strong>Datos de contacto:</strong> email, teléfono, dirección postal.
          </li>
          <li>
            <strong>Datos de compra:</strong> productos seleccionados, historial de pedidos,
            dirección de envío.
          </li>
          <li>
            <strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas
            y duración de la visita, con fines estadísticos y de mejora del Sitio.
          </li>
        </ul>
        <p>
          <strong>No recopilamos datos de tarjetas de crédito o débito.</strong> Los pagos son
          procesados directamente por Mercado Pago, que cuenta con sus propias políticas de
          seguridad y privacidad.
        </p>
      </LegalSection>

      <LegalSection title="3. Finalidad del tratamiento">
        <p>Utilizamos los datos personales para:</p>
        <ul>
          <li>Procesar y enviar los productos adquiridos.</li>
          <li>Comunicar el estado de los pedidos.</li>
          <li>Responder consultas y reclamos.</li>
          <li>
            Enviar comunicaciones comerciales (novedades, promociones), solo si el usuario lo ha
            autorizado expresamente.
          </li>
          <li>Cumplir con obligaciones legales (facturación, reportes a organismos públicos).</li>
          <li>Mejorar la experiencia del Sitio mediante análisis estadísticos.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Base legal">
        <p>
          El tratamiento de los datos se realiza con base en el consentimiento del usuario (al
          registrarse o realizar una compra) y/o en la ejecución del contrato de compraventa.
        </p>
      </LegalSection>

      <LegalSection title="5. Conservación de los datos">
        <p>
          Conservamos los datos personales mientras dure la relación comercial y durante los plazos
          exigidos por la normativa fiscal y comercial aplicable. Una vez vencidos esos plazos, los
          datos serán eliminados o anonimizados.
        </p>
      </LegalSection>

      <LegalSection title="6. Compartir datos con terceros">
        <p>
          No vendemos, alquilamos ni cedemos los datos personales a terceros. Solamente compartimos
          información con:
        </p>
        <ul>
          <li>
            <strong>Empresas de envío:</strong> para entregar los pedidos (nombre, dirección,
            teléfono).
          </li>
          <li>
            <strong>Mercado Pago:</strong> para procesar los pagos.
          </li>
          <li>
            <strong>Google (Firebase):</strong> proveedor de la infraestructura del Sitio, según sus
            propias políticas de privacidad.
          </li>
          <li>
            <strong>Organismos públicos:</strong> cuando exista una obligación legal de informar.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Derechos del titular de los datos">
        <p>Según la Ley 25.326, usted tiene derecho a:</p>
        <ul>
          <li>
            <strong>Acceso:</strong> solicitar información sobre los datos que tenemos sobre usted.
          </li>
          <li>
            <strong>Rectificación:</strong> solicitar la corrección de datos inexactos.
          </li>
          <li>
            <strong>Supresión:</strong> solicitar la eliminación de sus datos (sujeto a obligaciones
            legales de conservación).
          </li>
          <li>
            <strong>Oposición:</strong> oponerse al tratamiento de sus datos para ciertas
            finalidades, como el envío de comunicaciones comerciales.
          </li>
        </ul>
        <p>
          Para ejercer estos derechos, puede escribirnos a{' '}
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> con copia de
          un documento de identidad. Responderemos dentro de los 10 días corridos.
        </p>
      </LegalSection>

      <LegalSection title="8. Seguridad">
        <p>
          Adoptamos medidas técnicas y organizativas razonables para proteger los datos personales
          contra accesos no autorizados, pérdida o uso indebido. Sin embargo, ningún sistema es 100%
          seguro, y no podemos garantizar la seguridad absoluta de la información transmitida a
          través de internet.
        </p>
      </LegalSection>

      <LegalSection title="9. Cookies">
        <p>
          Este Sitio puede utilizar cookies y tecnologías similares para mejorar la experiencia del
          usuario, analizar el tráfico y recordar preferencias. El usuario puede configurar su
          navegador para rechazar cookies, aunque algunas funcionalidades del Sitio pueden verse
          afectadas.
        </p>
      </LegalSection>

      <LegalSection title="10. Autoridad de control">
        <p>
          La Agencia de Acceso a la Información Pública es la autoridad de control de la Ley 25.326.
          Si considera que sus derechos han sido vulnerados, puede presentar un reclamo ante ese
          organismo.{' '}
          <a href="https://www.argentina.gob.ar/aaip" target="_blank" rel="noopener noreferrer">
            Más información en argentina.gob.ar/aaip
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="11. Modificaciones a esta política">
        <p>
          La Empresa se reserva el derecho de modificar esta Política de privacidad en cualquier
          momento. Las modificaciones entrarán en vigencia desde su publicación en el Sitio. Le
          recomendamos revisar esta página periódicamente.
        </p>
      </LegalSection>
    </LegalLayout>
  );
};
