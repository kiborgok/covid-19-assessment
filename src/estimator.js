const covid19ImpactEstimator = (data) => {
  const currentlyInfected = (_reportedCases) => _reportedCases;
  const normalizePeriod = (period, timeToElapse) => {
    timeToElaps = Math.pow(2, Math.floor(timeToElapse / 3));
    switch (period) {
      case 'days':
        return timeToElaps;
      case 'weeks':
        return timeToElaps * 7;
      case 'months':
        return timeToElaps * 30;
      default:
        return null;
    }
  };

  const impact = {};
  const severeImpact = {};

  const crntlyInfected = currentlyInfected(data.reportedCases);
  const bedAvailability = data.totalHospitalBeds * 0.35;
  const period = normalizePeriod(data.periodType, data.timeToElapse);

  impact.currentlyInfected = crntlyInfected * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 * period;
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  const hospitalRequestedTime = bedAvailability - impact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = Math.floor(hospitalRequestedTime);

  severeImpact.currentlyInfected = crntlyInfected * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 * period;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
  const severeImpactCasesByRequestedTime = severeImpact.severeCasesByRequestedTime;
  const svrHospitalRequestedTime = bedAvailability - severeImpactCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = Math.floor(svrHospitalRequestedTime);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
