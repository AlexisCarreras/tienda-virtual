import { useState } from 'react';

import { Link as RouterLink } from 'react-router';

import { WhatsApp as WhatsAppIcon } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import { Alert } from '@/shared/components/Alert';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Textarea } from '@/shared/components/Textarea';
import { buildWhatsAppUrl, siteConfig } from '@/shared/config/siteConfig';

import { LegalLayout, LegalSection } from './LegalLayout';

/**
 * Página del Botón de arrepentimiento.
 * Ruta: /arrepentimiento
 *
 * Obligatorio por Resolución 424/2020 de la Secretaría de Comercio Interior.
 * Permite al consumidor formalizar el ejercicio del derecho de revocación
 * (art. 34, Ley 24.240) sin necesidad de redactar el reclamo desde cero.
 *
 * Al enviar el formulario, abrimos WhatsApp con el mensaje pre-armado,
 * que es la vía de contacto principal del emprendimiento.
 */
export const WithdrawalPage = () => {
  const [fullName, setFullName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [reason, setReason] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const isFormValid =
    fullName.trim().length >= 3 &&
    dni.trim().length >= 7 &&
    email.includes('@') &&
    orderNumber.trim().length > 0 &&
    productDescription.trim().length >= 3;

  const handleSubmit = () => {
    const message = `Hola, quiero ejercer el derecho de arrepentimiento (art. 34, Ley 24.240).

Mis datos:
- Nombre y apellido: ${fullName}
- DNI: ${dni}
- Email: ${email}
- Número de pedido: ${orderNumber}
- Producto a devolver: ${productDescription}${
      reason.trim() ? `\n- Motivo (opcional): ${reason}` : ''
    }

Aguardo instrucciones para coordinar la devolución. Gracias.`;

    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleReset = () => {
    setFullName('');
    setDni('');
    setEmail('');
    setOrderNumber('');
    setProductDescription('');
    setReason('');
    setSubmitted(false);
  };

  return (
    <LegalLayout
      title="Botón de arrepentimiento"
      subtitle="Ejercé tu derecho de revocar la compra dentro de los 10 días corridos."
      lastUpdated="Mayo 2026"
    >
      <LegalSection title="¿Qué es el botón de arrepentimiento?">
        <p>
          El botón de arrepentimiento es una herramienta obligatoria por{' '}
          <strong>Resolución 424/2020</strong> de la Secretaría de Comercio Interior, que permite al
          consumidor formalizar el ejercicio del <strong>derecho de revocación</strong> previsto en
          el artículo 34 de la Ley 24.240 de Defensa del Consumidor.
        </p>
        <p>
          Si compraste un producto online y no estás conforme, tenés{' '}
          <strong>10 días corridos</strong> desde la recepción para devolverlo, sin necesidad de
          expresar causa. Completá el formulario y nos contactaremos a la brevedad para coordinar la
          devolución.
        </p>
      </LegalSection>

      <Box sx={{ mb: 3 }}>
        <Alert severity="info" title="Antes de enviar">
          Revisá nuestra{' '}
          <Box
            component={RouterLink}
            to="/cambios"
            sx={{
              color: 'inherit',
              textDecoration: 'underline',
              fontWeight: 500,
            }}
          >
            política de cambios y devoluciones
          </Box>{' '}
          para conocer las condiciones (producto sin uso, etiquetas originales, etc.). Los productos
          con bordado personalizado no son pasibles de devolución por arrepentimiento.
        </Alert>
      </Box>

      {submitted ? (
        <SuccessMessage onReset={handleReset} />
      ) : (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            padding: { xs: 3, md: 4 },
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Formulario de arrepentimiento
            </Typography>

            <Input
              label="Nombre y apellido"
              value={fullName}
              onChange={setFullName}
              placeholder="Como figura en el documento"
              required
            />

            <Input
              label="DNI"
              value={dni}
              onChange={setDni}
              placeholder="Sin puntos ni espacios"
              required
            />

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="El mismo que usaste en la compra"
              required
            />

            <Input
              label="Número de pedido"
              value={orderNumber}
              onChange={setOrderNumber}
              placeholder="Lo encontrás en el email de confirmación"
              required
            />

            <Textarea
              label="Producto a devolver"
              value={productDescription}
              onChange={setProductDescription}
              placeholder="Ej: Vestido denim talle M con bordado floral"
              minRows={2}
              required
            />

            <Textarea
              label="Motivo (opcional)"
              value={reason}
              onChange={setReason}
              placeholder="No estás obligada a indicar el motivo, pero nos sirve para mejorar"
              minRows={3}
            />

            <Stack spacing={1.5}>
              <Button
                size="large"
                startIcon={<WhatsAppIcon />}
                onClick={handleSubmit}
                disabled={!isFormValid}
                fullWidth
              >
                Enviar solicitud por WhatsApp
              </Button>
              <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                Al enviar, abrimos WhatsApp con tu mensaje pre-armado. Confirmá el envío desde la
                app.
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}

      <LegalSection title="Alternativas de contacto">
        <p>Si preferís otro medio, también podés:</p>
        <ul>
          <li>
            Escribirnos a{' '}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </li>
          <li>
            Contactarnos directamente por WhatsApp al{' '}
            <strong>{siteConfig.contact.whatsappDisplay}</strong>
          </li>
        </ul>
        <p>
          En cualquiera de los casos, incluí tu número de pedido y el producto que querés devolver.
        </p>
      </LegalSection>
    </LegalLayout>
  );
};

/**
 * Mensaje de éxito que aparece tras enviar el form.
 */
type SuccessMessageProps = {
  onReset: () => void;
};

const SuccessMessage = ({ onReset }: SuccessMessageProps) => (
  <Stack spacing={2.5}>
    <Alert severity="success" title="¡Listo! Tu solicitud está en camino">
      Abrimos WhatsApp con tu mensaje. Asegurate de presionar "Enviar" en la app para que recibamos
      el reclamo. Vamos a responderte dentro de los próximos días hábiles para coordinar la
      devolución.
    </Alert>
    <Box>
      <Button variant="secondary" size="small" onClick={onReset}>
        Enviar otra solicitud
      </Button>
    </Box>
  </Stack>
);
