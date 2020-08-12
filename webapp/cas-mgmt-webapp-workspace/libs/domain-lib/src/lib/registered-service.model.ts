import {accessStrategyFactory, RegisteredServiceAccessStrategy} from './access-strategy.model';
import {mfaPolicyFactory, RegisteredServiceMultifactorPolicy} from './multifactor.model';
import {proxyFactory, RegisteredServiceProxyPolicy} from './proxy-policy.model';
import {RegisteredServiceUsernameAttributeProvider, usernameProviderFactory} from './attribute-provider.model';
import {attributeReleaseFactory, RegisteredServiceAttributeReleasePolicy} from './attribute-release.model';
import {RegisteredServicePublicKey} from './public-key.model';
import {DefaultRegisteredServiceProperty} from './property.model';
import {contactsFactory, RegisteredServiceContact} from './contact.model';
import {expirationPolicyFactory, RegisteredServiceExpirationPolicy} from './expiration.model';
import {RegisteredServiceServiceTicketExpirationPolicy, serviceTicketExpirationPolicy} from './service-ticket-expiration.model';
import {proxyTicketExpirationPolicy, RegisteredServiceProxyTicketExpirationPolicy} from './proxy-ticket-expiration.model';
import {RegisteredServiceSingleSignOnParticipationPolicy, ssoParticipationPolicy} from './sso-expiration.model';

export abstract class RegisteredService {
  serviceId: string;
  name: string;
  theme: string;
  informationUrl: string;
  privacyUrl: string;
  responseType: string;
  id: number;
  description: string;
  proxyPolicy: RegisteredServiceProxyPolicy;
  proxyTicketExpirationPolicy: RegisteredServiceProxyTicketExpirationPolicy;
  serviceTicketExpirationPolicy: RegisteredServiceServiceTicketExpirationPolicy;
  singleSignOnParticipationPolicy: RegisteredServiceSingleSignOnParticipationPolicy;
  evaluationOrder: number;
  usernameAttributeProvider: RegisteredServiceUsernameAttributeProvider;
  requiredHandlers: string[];
  attributeReleasePolicy: RegisteredServiceAttributeReleasePolicy;
  multifactorPolicy: RegisteredServiceMultifactorPolicy;
  logo: string;
  logoutUrl: string;
  logoutType: string;
  accessStrategy: RegisteredServiceAccessStrategy;
  publicKey: RegisteredServicePublicKey;
  properties: Map<string, DefaultRegisteredServiceProperty>;
  contacts: RegisteredServiceContact[];
  expirationPolicy: RegisteredServiceExpirationPolicy;
  environments: string[];

  constructor(service?: RegisteredService) {
    this.serviceId = service?.serviceId;
    this.name = service?.name;
    this.theme = service?.theme;
    this.informationUrl = service?.informationUrl;
    this.privacyUrl = service?.privacyUrl;
    this.responseType = service?.responseType;
    this.id = service?.id ?? -1;
    this.description = service?.description;
    this.proxyPolicy = proxyFactory(service?.proxyPolicy);
    this.proxyTicketExpirationPolicy = proxyTicketExpirationPolicy(service?.proxyTicketExpirationPolicy);
    this.serviceTicketExpirationPolicy = serviceTicketExpirationPolicy(service?.serviceTicketExpirationPolicy);
    this.singleSignOnParticipationPolicy = ssoParticipationPolicy(service?.singleSignOnParticipationPolicy);
    this.evaluationOrder = service?.evaluationOrder ?? -1;
    this.usernameAttributeProvider = usernameProviderFactory(service?.usernameAttributeProvider);
    this.requiredHandlers = service?.requiredHandlers;
    this.attributeReleasePolicy = attributeReleaseFactory(service?.attributeReleasePolicy);
    this.multifactorPolicy = mfaPolicyFactory(service?.multifactorPolicy);
    this.logo = service?.logo;
    this.logoutUrl = service?.logoutUrl;
    this.logoutType = service?.logoutType ?? 'BACK_CHANNEL';
    this.accessStrategy = accessStrategyFactory(service?.accessStrategy);
    this.publicKey = service?.publicKey;
    this.properties = service?.properties;
    this.contacts = contactsFactory(service?.contacts);
    this.expirationPolicy = expirationPolicyFactory(service?.expirationPolicy);
    this.environments = service?.environments;
  }
}

export abstract class AbstractRegisteredService extends RegisteredService {
  constructor(service?: RegisteredService) {
    super(service);
  }
}

export class RegexRegisteredService extends AbstractRegisteredService {
  static cName = 'org.apereo.cas.services.RegexRegisteredService';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegexRegisteredService.cName;
  }

  constructor(service?: RegisteredService) {
    super(service);
    this['@class'] = RegexRegisteredService.cName;
  }
}

