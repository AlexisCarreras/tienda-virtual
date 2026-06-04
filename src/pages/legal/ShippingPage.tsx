import { Link as RouterLink } from 'react-router';

import { siteConfig } from '@/shared/config/siteConfig';

import { LegalLayout, LegalSection } from './LegalLayout';

/**
 * Página de Política de envíos.
 * Ruta: /envios
 *
 * Aunque no es estrictamente obligatoria por ley, la Resolución 51/2017
 * exige que el cliente tenga clara la información sobre tiempos, costos
 * y modalidades de envío antes de cerrar la compra.
 */
export const ShippingPage = () => {
  return (
    <LegalLayout
      title="Política de envíos"
      subtitle="Cómo, cuándo y a dónde enviamos tus pedidos."
      lastUpdated="Mayo 2026"
    >
      <LegalSection title="1. Zonas de cobertura">
        <p>
          Realizamos envíos a todo el territorio de la República Argentina a través de operadores
          logísticos habilitados (Correo Argentino, Andreani, OCA u otros, según disponibilidad).
        </p>
        <p>
          Por el momento <strong>no realizamos envíos internacionales</strong>.
        </p>
      </LegalSection>

      <LegalSection title="2. Tiempos de preparación">
        <p>
          Cada pieza es elaborada o terminada a mano. Por eso, el tiempo de preparación del pedido
          puede variar:
        </p>
        <ul>
          <li>
            <strong>Productos en stock:</strong> se preparan dentro de las 48 a 72 horas hábiles
            posteriores a la confirmación del pago.
          </li>
          <li>
            <strong>Productos a pedido o con bordado personalizado:</strong> el tiempo de
            preparación se informa al confirmar la compra y puede extenderse entre 7 y 21 días
            hábiles.
          </li>
        </ul>
        <p>
          Recibirás un email cuando tu pedido sea despachado, con el código de seguimiento
          correspondiente.
        </p>
      </LegalSection>

      <LegalSection title="3. Tiempos de entrega">
        <p>Los tiempos de entrega dependen del operador logístico y del destino:</p>
        <ul>
          <li>
            <strong>CABA y Gran Buenos Aires:</strong> de 2 a 5 días hábiles desde el despacho.
          </li>
          <li>
            <strong>Resto del país:</strong> de 5 a 10 días hábiles desde el despacho.
          </li>
          <li>
            <strong>Localidades alejadas o sucursales rurales:</strong> hasta 15 días hábiles.
          </li>
        </ul>
        <p>
          Los plazos son estimativos. La Empresa no se responsabiliza por demoras causadas por
          factores externos al operador logístico (condiciones climáticas, paros, feriados, etc.).
        </p>
      </LegalSection>

      <LegalSection title="4. Costos de envío">
        <p>
          El costo del envío se calcula automáticamente en el checkout en base al código postal de
          destino y al peso del paquete. El monto final se muestra antes de confirmar el pago.
        </p>
        <p>
          Eventualmente podemos ofrecer <strong>envío bonificado</strong> en campañas o por superar
          un monto mínimo de compra. Las condiciones se informarán en el Sitio cuando corresponda.
        </p>
      </LegalSection>

      <LegalSection title="5. Modalidades de entrega">
        <p>Ofrecemos dos modalidades:</p>
        <ul>
          <li>
            <strong>Envío a domicilio:</strong> el operador logístico realiza hasta 2 intentos de
            entrega en el domicilio indicado.
          </li>
          <li>
            <strong>Retiro en sucursal:</strong> el envío llega a una sucursal del operador elegido
            y el cliente lo retira con su DNI dentro del plazo informado.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Datos del destinatario">
        <p>
          Es responsabilidad del comprador ingresar correctamente los datos del destinatario:
          nombre, DNI, dirección, código postal y teléfono de contacto. Si el envío no puede
          completarse por datos incorrectos o ausencia reiterada, el paquete será devuelto a la
          Empresa y un nuevo envío tendrá un costo adicional a cargo del comprador.
        </p>
      </LegalSection>

      <LegalSection title="7. Recepción del paquete">
        <p>
          Al recibir el paquete, te pedimos que verifiques que el embalaje esté en buenas
          condiciones. Si notás algún daño visible, dejalo asentado ante el repartidor antes de
          firmar la recepción y contactanos dentro de las 24 horas.
        </p>
      </LegalSection>

      <LegalSection title="8. Pedidos extraviados o demoras significativas">
        <p>
          Si tu pedido tarda más de lo informado, contactanos a{' '}
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> o por
          WhatsApp al <strong>{siteConfig.contact.whatsappDisplay}</strong>. Vamos a hacer el
          seguimiento con el operador logístico y mantenerte informada del estado.
        </p>
        <p>
          En caso de extravío confirmado por el operador, gestionaremos el reenvío del producto o el
          reembolso, según corresponda.
        </p>
      </LegalSection>

      <LegalSection title="9. Cambios y devoluciones">
        <p>
          Si querés cambiar un producto o ejercer tu derecho de arrepentimiento, consultá nuestra{' '}
          <RouterLink to="/cambios">política de cambios y devoluciones</RouterLink> o utilizá el{' '}
          <RouterLink to="/arrepentimiento">botón de arrepentimiento</RouterLink>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
};
