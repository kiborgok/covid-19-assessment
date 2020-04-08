const covid19ImpactEstimator = (data) => {
  const currentlyInfected = (_reportedCases) => _reportedCases;

  const impact = {};
  const severeImpact = {};

  const crntlyInfected = currentlyInfected(data.reportedCases);
  const bedAvailability = data.totalHospitalBeds * 0.35;

  impact.currentlyInfected = crntlyInfected * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 512;
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  impact.hospitalBedsByRequestedTime = bedAvailability - impact.severeCasesByRequestedTime;

  severeImpact.currentlyInfected = crntlyInfected * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 512;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
  const severeImpactCasesByRequestedTime = severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = bedAvailability - severeImpactCasesByRequestedTime;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
