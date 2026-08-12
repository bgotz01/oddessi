/**
 * Challenge interpretations — what each number means as the obstacle inside a
 * pinnacle chapter.
 *
 * A challenge is a difference rather than a sum, which gives it a different
 * character from the pinnacle it sits under. The same number that reads as
 * initiative in the pinnacle reads, as a challenge, as the place where
 * initiative keeps failing or being demanded past the point of wanting to give
 * it. The obstacle is the price of the chapter, not its opposite.
 *
 * Zero is only reachable here — two equal components cancel — and it has its
 * own reading because it is not the absence of a challenge. It is a challenge
 * with no fixed shape, and that is its own difficulty.
 */

import type { CoreNumber } from "./numbers";

export interface ChallengeReading {
  /**
   * What the obstacle is, stated plainly — not as a flaw but as a recurring
   * condition of the chapter. This is what the years keep turning up.
   */
  obstacle: string;
  /**
   * Where it tends to show up — the domains or relationships in which the
   * challenge becomes most visible.
   */
  terrain: string;
  /**
   * What working with this challenge rather than against it looks like. Not a
   * cure, but a different relationship to the condition.
   */
  working: string;
}

export const CHALLENGE_READINGS: Record<CoreNumber, ChallengeReading> = {
  0: {
    obstacle:
      "No single obstacle is named, which is the challenge. Without a specific difficulty to identify and push against, the person has to supply their own structure and their own demands — and that requires more self-knowledge than most obstacles do.",
    terrain:
      "Motivation and direction. The difficulty tends to appear as a failure to commit, or as a series of choices that look free and feel arbitrary.",
    working:
      "Treating the absence of an imposed challenge as a kind of gift that requires something in return: the choice has to be made, and made again, without the excuse of difficulty to explain why it was not.",
  },
  1: {
    obstacle:
      "Self-assertion — the repeated demand to act from one's own centre rather than waiting for direction, permission, or someone else to go first. The chapter keeps putting the person in situations where they have to decide alone.",
    terrain:
      "Leadership, originality, and any situation where standing apart from the group is required. Also: the relationship to authority, which tends to be fraught in both directions.",
    working:
      "Distinguishing between the initiative that is being asked for and the need for approval that is being disguised as caution. The chapter rewards the action taken without waiting to see how it lands.",
  },
  2: {
    obstacle:
      "Cooperation — the sustained effort to share a space, a decision, or a direction with another person without either controlling them or disappearing. The chapter makes this feel more costly than it is, and more than it should have to be.",
    terrain:
      "Close relationships and partnerships of any kind. Also: the emotional register, which tends to be amplified and taken literally rather than worked with.",
    working:
      "Learning to hold a position while remaining in contact — neither capitulating nor withdrawing. The challenge is not to become easier to be with, but to be with others from a more stable ground.",
  },
  3: {
    obstacle:
      "Expression — the gap between what is felt and what can be said, made, or shown. The chapter keeps presenting situations where the ability to communicate is insufficient for what is trying to come through.",
    terrain:
      "Creative work, speech, and any form of self-presentation. Also: the tendency to scatter rather than complete, and the critical faculty turned inward before anything is finished.",
    working:
      "Making something small and finishing it, rather than waiting for the form that is equal to the feeling. The challenge is not to become more articulate; it is to stop treating incompleteness as a reason not to begin.",
  },
  4: {
    obstacle:
      "Discipline — the repeated demand to build something that requires more steadiness than feels available. The chapter keeps asking for structure in conditions that resist it.",
    terrain:
      "Work, routine, and practical life. Also: the body, which is often where the rigidity of a 4 challenge shows up first — held in place, overworked, or refused.",
    working:
      "Separating the discipline from the punishment. The challenge is not to become harder on oneself; it is to find the kind of structure that comes from interest rather than from fear of what happens without it.",
  },
  5: {
    obstacle:
      "Freedom — or rather, the management of the appetite for it. The chapter keeps generating situations where the desire for change, escape, or new experience conflicts with what is already in hand.",
    terrain:
      "Commitment and follow-through, wherever they are required. Also: the body and its sensations, which tend to become either a vehicle for freedom or its casualty.",
    working:
      "Noticing what the movement is toward, not just what it is away from. The challenge is not to stop wanting change; it is to find out whether the change being sought is a direction or a habit.",
  },
  6: {
    obstacle:
      "Responsibility — specifically, the kind that is taken on without being asked and held long past the point where it serves anyone. The chapter keeps offering care as a way of avoiding something else.",
    terrain:
      "Family, home, and close obligation. Also: perfectionism, which is often the 6 challenge in a form that has detached from its origin and is operating on its own.",
    working:
      "Asking, honestly, whether the responsibility is wanted — not whether it is deserved or appropriate, but whether it is actually chosen. The challenge is not to care less but to find the line between care and control.",
  },
  7: {
    obstacle:
      "Faith — the ability to continue in the absence of proof, to trust what cannot yet be verified, and to remain in relationship with the world while keeping enough distance to think clearly.",
    terrain:
      "Belief, including belief in oneself. Also: solitude, which the 7 challenge tends to produce even in people who do not want it, and the suspicion that accumulates when the distance goes unexamined.",
    working:
      "Distinguishing between the withdrawal that produces understanding and the withdrawal that is protection. The challenge is not to become more social; it is to stay in contact with enough of the world to know what the distance is for.",
  },
  8: {
    obstacle:
      "Power — the recurring demand to take authority, use it honestly, and remain in right relationship with the material consequences of doing so. The chapter tends to put the person in positions where power is either unavailable or misused.",
    terrain:
      "Money, status, and any structure of authority or resource. Also: the relationship to ambition, which tends to be either suppressed or unexamined.",
    working:
      "Treating competence as the measure rather than recognition. The challenge is not to stop wanting influence; it is to build the kind that does not require constant demonstration.",
  },
  9: {
    obstacle:
      "Completion — the ability to let something end, release what it represented, and move on without the thing that is gone. The chapter keeps raising the question of what is being held on to.",
    terrain:
      "Endings of all kinds: relationships, roles, phases of life. Also: the past, which tends to stay present longer than it should under a 9 challenge.",
    working:
      "Treating release as an act rather than a state. The challenge is not to feel less attachment; it is to act from the knowledge of what is ending even while the attachment is still there.",
  },
  11: {
    obstacle:
      "The pressure of perception — a sensitivity that arrives as a gift and operates as a burden. The chapter keeps producing situations where what is seen or sensed cannot be unseen, and cannot always be communicated.",
    terrain:
      "Relationships where the sensitivity is felt as intrusion, and any context where the gap between what is perceived and what is named is wide enough to be isolating.",
    working:
      "Finding a use for what arrives — a form, a practice, a way of being with the perception that does not require it to be explained. The challenge is not to become less sensitive; it is to stop treating the sensitivity as a problem to be solved.",
  },
  22: {
    obstacle:
      "Scale — the repeated mismatch between what is attempted and what can be completed alone, and the management of that gap across years. The chapter tends to produce ambitions that outrun available resources.",
    terrain:
      "Long projects, collaborative structures, and any endeavour that requires sustained commitment to something that will not be finished quickly.",
    working:
      "Working on the foundation when the building is not visible. The challenge is not to reduce the ambition; it is to find the relationship to the work that makes it possible to continue without the evidence of progress.",
  },
  33: {
    obstacle:
      "The boundary between care and self-erasure — the sustained difficulty of giving without disappearing, and of remaining present to others without losing the ground that makes presence possible.",
    terrain:
      "Caregiving, service, and any relationship where the needs of others are large. Also: the private life, which tends to be crowded out without a deliberate effort to keep it.",
    working:
      "Treating self-preservation as part of the service rather than as its opposite. The challenge is not to care less; it is to keep enough in reserve that the care remains a choice.",
  },
};
