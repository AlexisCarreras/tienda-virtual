import { Link as RouterLink } from 'react-router';

import { siteConfig } from '@/shared/config/siteConfig';

import { LegalLayout, LegalSection } from './LegalLayout';

/**
 * Página de Política de cambios y devoluciones.
 * Ruta: /cambios
 *
 * Cumple con el artículo 34 de la Ley 24.240 de Defensa del Consumidor
 * (derecho de arrepentimiento de 10 días corridos para compras a distancia).
 */
export const ReturnsPage = () => {
  return (
    <LegalLayout
      title="Cambios y devoluciones"
      subtitle="Tu derecho a cambiar o devolver un producto comprado online."
      lastUpdated="Mayo 2026"
    >
      <LegalSection title="1. Derecho de arrepentimiento">
        <p>
          De acuerdo con el <strong>artículo 34 de la Ley 24.240</strong> de Defensa del Consumidor,
          tenés derecho a revocar la compra dentro de los <strong>10 (diez) días corridos</strong>{' '}
          contados a partir de la recepción del producto, sin necesidad de expresar causa.
        </p>
        <p>Para ejercer este derecho, podés:</p>
        <ul>
          <li>
            Completar el <RouterLink to="/arrepentimiento">botón de arrepentimiento</RouterLink>{' '}
            disponible en el Sitio.
          </li>
          <li>
            Enviar un email a{' '}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> indicando
            tu número de pedido y el motivo (opcional).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Condiciones para devoluciones">
        <p>
          Para que la devolución sea aceptada, el producto debe cumplir con las siguientes
          condiciones:
        </p>
        <ul>
          <li>
            Estar <strong>sin uso</strong>, con todas sus etiquetas originales y en el mismo estado
            en que fue recibido.
          </li>
          <li>Conservar el packaging original cuando sea posible.</li>
          <li>Que hayan transcurrido menos de 10 días corridos desde la recepción.</li>
        </ul>
        <p>
          Las piezas con <strong>bordado personalizado o realizadas a pedido</strong> no son
          pasibles de devolución por arrepentimiento, salvo defecto de fabricación, ya que se trata
          de productos confeccionados según especificaciones del cliente.
        </p>
      </LegalSection>

      <LegalSection title="3. Procedimiento para devolver un producto">
        <p>Una vez confirmada la solicitud, te enviaremos por email:</p>
        <ul>
          <li>La dirección postal o sucursal a donde despachar el producto.</li>
          <li>El instructivo para el reintegro del importe abonado.</li>
        </ul>
        <p>
          Los <strong>costos de envío de la devolución</strong> están a cargo del comprador, salvo
          que se trate de un producto defectuoso o de un error de la Empresa, en cuyo caso los
          asumimos nosotros.
        </p>
      </LegalSection>

      <LegalSection title="4. Reintegro del importe">
        <p>
          Una vez recibido el producto y verificado que cumple con las condiciones de devolución,
          procesaremos el reintegro dentro de los <strong>10 días hábiles</strong> siguientes, a
          través del mismo medio de pago utilizado en la compra.
        </p>
        <p>
          Si el pago se realizó con tarjeta, el tiempo en el que veas el reintegro reflejado depende
          de tu emisor y de Mercado Pago. En general, es entre 5 y 20 días hábiles adicionales.
        </p>
      </LegalSection>

      <LegalSection title="5. Cambios de talle o color">
        <p>
          Si querés cambiar un producto por otro talle o por otra prenda (no por arrepentimiento,
          sino por preferencia), también podés solicitarlo dentro de los 10 días corridos desde la
          recepción.
        </p>
        <p>El procedimiento es similar:</p>
        <ul>
          <li>
            Contactanos por <a href={`mailto:${siteConfig.contact.email}`}>email</a> o{' '}
            <strong>WhatsApp ({siteConfig.contact.whatsappDisplay})</strong> indicando tu pedido y
            qué cambio querés hacer.
          </li>
          <li>Te confirmamos disponibilidad del producto deseado y la dirección de envío.</li>
          <li>Una vez recibido el producto original en buen estado, despachamos el cambio.</li>
        </ul>
        <p>
          Si el producto del cambio tiene un precio distinto, ajustamos la diferencia (a favor o a
          abonar).
        </p>
      </LegalSection>

      <LegalSection title="6. Productos defectuosos">
        <p>
          Si recibís un producto con un defecto de fabricación o que no corresponde con lo
          solicitado, contactanos dentro de las 48 horas de recibirlo. Vamos a coordinar el
          reemplazo o devolución sin costo para vos.
        </p>
        <p>
          Te pedimos que adjuntes fotos del producto en el momento de la comunicación para agilizar
          la gestión.
        </p>
      </LegalSection>

      <LegalSection title="7. Defensa del consumidor">
        <p>
          En caso de no llegar a un acuerdo con la Empresa, podés recurrir al{' '}
          <strong>Sistema Nacional de Arbitraje de Consumo</strong> o a la autoridad de aplicación
          de tu provincia.{' '}
          <a
            href="https://www.argentina.gob.ar/produccion/defensadelconsumidor"
            target="_blank"
            rel="noopener noreferrer"
          >
            Más información acá
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
};
