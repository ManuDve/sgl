# Definition of Done — SGL
> Versión 1.0.0 — 25/04/2026

---

## Una historia se mueve a "Completado" cuando cumple TODOS estos criterios:

### 1. Criterios de aceptación
- [ ] El enunciado y todos los criterios de aceptación de la historia están implementados
- [ ] Validados manualmente en el flujo completo

### 2. Pruebas
- [ ] Prueba manual del flujo ejecutada
- [ ] Tests unitarios escritos con JUnit 5 + Mockito (cuando aplica al backend)
- [ ] Evidencia de cobertura disponible (JaCoCo/SonarQube) — registrada en Jira/Confluence

### 3. Smoke test
- [ ] Los flujos críticos existentes no se rompen con el nuevo cambio

### 4. Documentación mínima
- [ ] Confluence / README actualizado si hay cambios estructurales
- [ ] Endpoint documentado en Swagger si aplica
- [ ] Colección Postman actualizada cuando la historia afecta endpoints del backend (`sgl_back/sgl_back/sgl_back.postman_collection.json`)

### 5. Aceptación del PO
- [ ] Validación del patrocinador/PO registrada (comentario Jira / correo / WhatsApp)

### 6. Seguridad mínima (verificar según historia)
- [ ] Panel admin protegido por autenticación JWT
- [ ] Inputs validados y sanitizados (XSS / SQL Injection)
- [ ] Anti-bots en formulario de agendamiento (reCAPTCHA v3)
- [ ] Rate limiting aplicado en endpoints públicos si corresponde

---

## Release Goal (Release 1)

Implementar el flujo completo de agendamiento público (selección de servicio, fecha/hora y confirmación) más el panel administrativo básico para visualizar agendamientos y confirmar pagos.

El sistema debe ser **usable, seguro y trazable**.

### Checklist de Release
| Ítem | Estado |
|------|--------|
| Product Goal alcanzado | [ ] |
| Release Goal alcanzado | [ ] |
| Todos los MUST implementados | [ ] |
| Requisitos de rendimiento, seguridad y compatibilidad | [ ] |
| Documentación técnica entregada | [ ] |
| Aceptación del PO | [ ] |
| Incremento funcional integrado y demostrable (deploy o demo local) | [ ] |
