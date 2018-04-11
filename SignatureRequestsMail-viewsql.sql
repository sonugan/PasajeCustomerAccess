ALTER VIEW [dbo].[SignatureRequestsMail]
AS
SELECT s.ClientId, 
	   s.DocumentType, 
	   ee.EMail,
	   c.MailingPreference,
	   p.PolicyNumber
FROM SignatureRequests s
   , DocumentsVt vt
   , Policies p
   , StatusPols e
   , EMailsEncrypt ee
   , Clients C
WHERE CONVERT(FLOAT, S.PolicyNumber) = CONVERT(FLOAT, VT.sOfficialPol)   
  AND CONVERT(FLOAT, S.PolicyNumber) = CONVERT(FLOAT, P.PolicyNumber)--
  AND P.CLIENTID = C.CLIENTID
  AND ee.CLIENTID = P.CLIENTID
  AND C.ClientId = S.ClientId-------------
  AND S.DocumentType = VT.ncrthecni
  AND VT.dNulldate IS NULL /* Solo se toma el ultimo registro vigente de la tabla VT*/
  AND (S.DocumentType = 5 OR (S.DocumentType BETWEEN 101 and 250))
  AND S.PolicyStatus is NULL /* Nunca la poliza pasó a estar inactiva*/
  AND P.PolicyNumber like '0%'
  
  AND P.StatusDesc = E.Status 
  AND E.IsDeleted = 0 /* Estados Habilitados*/
  AND E.IsActive = 1  /* Solo polizas activas*/

  AND (S.SignatureOnlineStatus = 'Pendiente' OR S.SignatureOnlineStatus IS NULL)
  AND (S.SignatureInPersonStatus = 'Pendiente' OR S.SignatureInPersonStatus IS NULL)
  AND dbo.DocumentState(S.PolicyNumber, s.DocumentType) = 'Pendiente'
  AND S.ProcedureNumber is NULL /* No se han firmado anteriormente */
  AND S.DestinationContent = 'TOMADOR'

  AND DATEADD(DAY, 7, vt.dDocdate) <= GETDATE()  
  --AND C.MailingPreference IN ('e-Mail', 'CP con mail', 'Canal Web')




GO


