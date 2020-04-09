const covid19ImpactEstimator = (data) => {
  const currentlyInfected = (_reportedCases) => _reportedCases;
  const normalizePeriod = (period, timeToElapse) => {
    switch (period) {
      case 'days':
        return timeToElapse;
        break;
      case 'weeks':
        return timeToElapse * 7;
        break;
      case 'months':
        return timeToElapse * 30;
        break;
      default:
        return null;
    }
  }

  const impact = {};
  const severeImpact = {};

  const crntlyInfected = currentlyInfected(data.reportedCases);
  const bedAvailability = data.totalHospitalBeds * 0.35;
  const period = normalizePeriod(data.periodType, data.timeToElapse)

  impact.currentlyInfected = crntlyInfected * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * period;
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  impact.hospitalBedsByRequestedTime = bedAvailability - impact.severeCasesByRequestedTime | 0;

  severeImpact.currentlyInfected = crntlyInfected * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * period;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
  const severeImpactCasesByRequestedTime = severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = bedAvailability - severeImpactCasesByRequestedTime | 0;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
