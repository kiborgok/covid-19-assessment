const covid19ImpactEstimator = (data) => {
  const currentlyInfected = (_reportedCases) => _reportedCases;
  const normalizePeriod = (period, timeToElapse) => {
    let timeToElaps = 2 ** Math.trunc(timeToElapse / 3);
    const weeksInDays = timeToElapse * 7;
    const monthsInDays = timeToElapse * 30;
    switch (period) {
      case 'days':
        return timeToElaps;
      case 'weeks':
        timeToElaps = 2 ** Math.trunc(weeksInDays / 3);
        return timeToElaps;
      case 'months':
        timeToElaps = 2 ** Math.trunc(monthsInDays / 3);
        return timeToElaps;
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
  impact.infectionsByRequestedTime = impact.currentlyInfected * period;
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  const hospitalRequestedTime = bedAvailability - impact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = Math.trunc(hospitalRequestedTime);
  impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.05);
  impact.casesForVentilatorsByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.02);
  const impactDollarsInFlight = impact.infectionsByRequestedTime * 0.65 * 1.5;
  impact.dollarsInFlight = impactDollarsInFlight;

  severeImpact.currentlyInfected = crntlyInfected * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * period;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
  const severeImpactCasesByRequestedTime = severeImpact.severeCasesByRequestedTime;
  const svrHospitalRequestedTime = bedAvailability - severeImpactCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(svrHospitalRequestedTime);
  const severeIcuCases = Math.trunc(severeImpact.infectionsByRequestedTime * 0.05);
  severeImpact.casesForICUByRequestedTime = severeIcuCases;
  const severeVentilatorCases = Math.trunc(severeImpact.infectionsByRequestedTime * 0.02);
  severeImpact.casesForVentilatorsByRequestedTime = severeVentilatorCases;
  const severeImpactDollarsInFlight = severeImpact.infectionsByRequestedTime * 0.65 * 1.5;
  severeImpact.dollarsInFlight = severeImpactDollarsInFlight;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
