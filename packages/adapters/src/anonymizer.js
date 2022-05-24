import log from "./log.js";
import { DicomMetaDictionary } from "./DicomMetaDictionary.js";
import { Tag } from "./Tag.js";

var tagNamesToEmpty = [
    // please override these in specificReplaceDefaults to have useful values
    "PatientID",
    "PatientName",

    // 0/3: those that appear missing in CTP
    "SeriesDate",
    "AccessionNumber",
    // (valuable, but sometimes manually filled)
    "SeriesDescription",
    // cat 1/3: CTP: set to empty explicitely using @empty
    "StudyTime",
    "ContentTime",
    "ReferringPhysicianName",
    "PatientBirthDate",
    "PatientSex",
    "ClinicalTrialSiteID",
    "ClinicalTrialSiteName",
    "ClinicalTrialSubjectID",
    "ClinicalTrialSubjectReadingID",
    "ClinicalTrialTimePointID",
    "ClinicalTrialTimePointDescription",
    "ContrastBolusAgent",
    "StudyID",
    // cat 2/3: CTP: set to increment dates
    "InstanceCreationDate",
    "StudyDate",
    "ContentDate",
    "DateOfSecondaryCapture",
    "DateOfLastCalibration",
    "DateOfLastDetectorCalibration",
    "FrameAcquisitionDatetime",
    "FrameReferenceDatetime",
    "StudyVerifiedDate",
    "StudyReadDate",
    "ScheduledStudyStartDate",
    "ScheduledStudyStopDate",
    "StudyArrivalDate",
    "StudyCompletionDate",
    "ScheduledAdmissionDate",
    "ScheduledDischargeDate",
    "DischargeDate",
    "SPSStartDate",
    "SPSEndDate",
    "PPSStartDate",
    "PPSEndDate",
    "IssueDateOfImagingServiceRequest",
    "VerificationDateTime",
    "ObservationDateTime",
    "DateTime",
    "Date",
    "RefDatetime",
    // cat 3/3: CTP: set to remove using @remove
    "AcquisitionDate",
    "OverlayDate",
    "CurveDate",
    "AcquisitionDatetime",
    "SeriesTime",
    "AcquisitionTime",
    "OverlayTime",
    "CurveTime",
    "InstitutionName",
    "InstitutionAddress",
    "ReferringPhysicianAddress",
    "ReferringPhysicianPhoneNumbers",
    "ReferringPhysiciansIDSeq",
    "TimezoneOffsetFromUTC",
    "StationName",
    "StudyDescription",
    "InstitutionalDepartmentName",
    "PhysicianOfRecord",
    "PhysicianOfRecordIdSeq",
    "PerformingPhysicianName",
    "PerformingPhysicianIdSeq",
    "NameOfPhysicianReadingStudy",
    "PhysicianReadingStudyIdSeq",
    "OperatorName",
    "OperatorsIdentificationSeq",
    "AdmittingDiagnosisDescription",
    "AdmittingDiagnosisCodeSeq",
    "RefStudySeq",
    "RefPPSSeq",
    "RefPatientSeq",
    "RefImageSeq",
    "DerivationDescription",
    "SourceImageSeq",
    "IdentifyingComments",
    "IssuerOfPatientID",
    "PatientBirthTime",
    "PatientInsurancePlanCodeSeq",
    "PatientPrimaryLanguageCodeSeq",
    "PatientPrimaryLanguageModifierCodeSeq",
    "OtherPatientIDs",
    "OtherPatientNames",
    "OtherPatientIDsSeq",
    "PatientBirthName",
    "PatientAge",
    "PatientSize",
    "PatientWeight",
    "PatientAddress",
    "InsurancePlanIdentification",
    "PatientMotherBirthName",
    "MilitaryRank",
    "BranchOfService",
    "MedicalRecordLocator",
    "MedicalAlerts",
    "ContrastAllergies",
    "CountryOfResidence",
    "RegionOfResidence",
    "PatientPhoneNumbers",
    "EthnicGroup",
    "Occupation",
    "SmokingStatus",
    "AdditionalPatientHistory",
    "PregnancyStatus",
    "LastMenstrualDate",
    "PatientReligiousPreference",
    "PatientSexNeutered",
    "ResponsiblePerson",
    "ResponsibleOrganization",
    "PatientComments",
    "DeviceSerialNumber",
    "PlateID",
    "GeneratorID",
    "CassetteID",
    "GantryID",
    // we keep - should be SoftwareVersions anyway
    // "SoftwareVersion",
    "ProtocolName",
    "AcquisitionDeviceProcessingDescription",
    "AcquisitionComments",
    "DetectorID",
    "AcquisitionProtocolDescription",
    "ContributionDescription",
    "ModifyingDeviceID",
    "ModifyingDeviceManufacturer",
    "ModifiedImageDescription",
    "ImageComments",
    "ImagePresentationComments",
    "StudyIDIssuer",
    "ScheduledStudyLocation",
    "ScheduledStudyLocationAET",
    "ReasonforStudy",
    "RequestingPhysician",
    "RequestingService",
    "RequestedProcedureDescription",
    "RequestedContrastAgent",
    "StudyComments",
    "AdmissionID",
    "IssuerOfAdmissionID",
    "ScheduledPatientInstitutionResidence",
    "AdmittingDate",
    "AdmittingTime",
    "DischargeDiagnosisDescription",
    "SpecialNeeds",
    "ServiceEpisodeID",
    "IssuerOfServiceEpisodeId",
    "ServiceEpisodeDescription",
    "CurrentPatientLocation",
    "PatientInstitutionResidence",
    "PatientState",
    "ReferencedPatientAliasSeq",
    "VisitComments",
    "ScheduledStationAET",
    "ScheduledPerformingPhysicianName",
    "SPSDescription",
    "ScheduledStationName",
    "SPSLocation",
    "PreMedication",
    "PerformedStationAET",
    "PerformedStationName",
    "PerformedLocation",
    "PerformedStationNameCodeSeq",
    "PPSID",
    "PPSDescription",
    "RequestAttributesSeq",
    "PPSComments",
    "AcquisitionContextSeq",
    "PatientTransportArrangements",
    "RequestedProcedureLocation",
    "NamesOfIntendedRecipientsOfResults",
    "IntendedRecipientsOfResultsIDSequence",
    "PersonAddress",
    "PersonTelephoneNumbers",
    "RequestedProcedureComments",
    "ReasonForTheImagingServiceRequest",
    "OrderEnteredBy",
    "OrderEntererLocation",
    "OrderCallbackPhoneNumber",
    "ImagingServiceRequestComments",
    "ConfidentialityPatientData",
    "ScheduledStationNameCodeSeq",
    "ScheduledStationGeographicLocCodeSeq",
    "PerformedStationGeoLocCodeSeq",
    "ScheduledHumanPerformersSeq",
    "ActualHumanPerformersSequence",
    "HumanPerformersOrganization",
    "HumanPerformersName",
    "VerifyingOrganization",
    "VerifyingObserverName",
    "AuthorObserverSequence",
    "ParticipantSequence",
    "CustodialOrganizationSeq",
    "VerifyingObserverIdentificationCodeSeq",
    "PersonName",
    "ContentSeq",
    "OverlayData",
    "OverlayComments",
    "IconImageSequence",
    "TopicSubject",
    "TopicAuthor",
    "TopicKeyWords",
    "TextString",
    "Arbitrary",
    "TextComments",
    "ResultsIDIssuer",
    "InterpretationRecorder",
    "InterpretationTranscriber",
    "InterpretationText",
    "InterpretationAuthor",
    "InterpretationApproverSequence",
    "PhysicianApprovingInterpretation",
    "InterpretationDiagnosisDescription",
    "ResultsDistributionListSeq",
    "DistributionName",
    "DistributionAddress",
    "InterpretationIdIssuer",
    "Impressions",
    "ResultComments",
    "DigitalSignaturesSeq",
    "DataSetTrailingPadding"
];

export function cleanTags(dict) {
    tagNamesToEmpty.forEach(function(tag) {
        var tagInfo = DicomMetaDictionary.nameMap[tag];
        if (tagInfo && tagInfo.version != "PrivateTag") {
            var tagNumber = tagInfo.tag,
                tagString = Tag.fromPString(tagNumber).toCleanString();
            if (dict[tagString]) {
                log.log("empty tag " + tag);
                var newValue;
                if (tagString == "00100010") {
                    newValue = ["ANON^PATIENT"];
                } else if (tagString == "00100020") {
                    newValue = ["ANONID"];
                } else {
                    newValue = [];
                }
                dict[tagString].Value = newValue;
            }
        }
    });
}